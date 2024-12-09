import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useRef, useState } from "react";
import { User } from "@/types/User"; // Assuming a User type exists
import apiService from "@/app/services/apiService";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UsernameSearchProps {
  onSelect: (user: User | null) => void; // Callback to handle user selection
}

export default function UsernameSearch({ onSelect }: UsernameSearchProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Manage dropdown visibility
  const [users, setUsers] = useState<User[]>([]); // Hold fetched users
  const [searchQuery, setSearchQuery] = useState<string>(""); // Input state
  const commandRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch users by username
  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchQuery.trim()) {
        setUsers([]);
        return;
      }

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("search_query", searchQuery);
        const searchParams = queryParams.toString();
        console.log("searching", searchParams);
        const response = await apiService.get(`/api/users/?${searchParams}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    const debounceFetch = setTimeout(fetchUsers, 150); // Debounce to limit API calls
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  return (
    <div className="relative w-full" ref={commandRef}>
      <Command shouldFilter={false} className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search users..."
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && (
          <CommandList className="absolute top-full mt-2 w-full z-10 bg-background rounded-lg border shadow-md">
            <CommandGroup>
              {users.length > 0 ? (
                users.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => {
                      onSelect(user);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback>
                          {user.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.name}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>
                  {searchQuery.trim()
                    ? "No results found."
                    : "Start typing to search!"}
                </CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
