'use server';
import { cookies } from "next/headers";

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    (await cookies()).set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, //One week
        path: '/'
    });

    (await cookies()).set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, //60 minutes
        path: '/'
    });

    (await cookies()).set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, //One week
        path: '/'
    });
}

export async function resetAuthCookies() {
    (await cookies()).set('session_userid', '');
    (await cookies()).set('session_access_token', '');
    (await cookies()).set('session_refresh_token', '');
    console.log('cookies reset!')
}

export async function getUserId() {
    const userId = (await cookies()).get('session_userid')?.value
    return userId ? userId : null
}

// Function to get the access token from the session cookie
export async function getAccessToken() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("session_access_token")?.value;
  
    if (!accessToken) {
      accessToken = await handleRefresh();
    }
    return accessToken;
  }

export async function getRefreshToken() {
    const token = (await cookies()).get('session_refresh_token')?.value
    return token ? token : null
}

// Function to refresh the access token when it expires
export async function handleRefresh() {
    const refreshToken = await getRefreshToken();
    const cookieStore = await cookies();
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
        {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        // Handle HTTP errors
        console.error("Refresh token error:", await response.text());
        resetAuthCookies();
        return null;
      }
  
      const json = await response.json();
  
      if (json.access) {
        cookieStore.set("session_access_token", json.access, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 60 minutes
          path: "/",
        });
  
        return json.access;
      } else {
        resetAuthCookies();
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      resetAuthCookies();
      return null;
    }
  }
  