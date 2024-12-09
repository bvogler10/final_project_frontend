import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/User";
import { Upload } from "lucide-react";
import { FC, useRef, useState } from "react";

interface EditProfileDialogProps {
  profile: User;
}

export const EditProfileDialog: FC<EditProfileDialogProps> = ({ profile }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const editedProfile = profile;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [link, setLink] = useState(editedProfile.link ?? "");
  const [bio, setBio] = useState(editedProfile.bio ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const previewUrl = URL.createObjectURL(file); //Generate a preview URL
      setPreviewImage(previewUrl); //Generate a preview URL
    }
  };

  const handleEdit = async () => {
    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("bio", bio);
    formData.append("link", link);

    console.log(formData);

    const response = await apiService.put("/api/update_user", formData);

    if (response.message) {
      console.log("Response", response);
    }

    setIsEditProfileOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          setIsEditProfileOpen(true);
        }}
        className="text-left hover w-full"
      >
        Edit Profile
      </Button>
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Edit your profile details below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <div>
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={previewImage ? previewImage : editedProfile.avatar}
                    alt={editedProfile.username}
                  />
                  <AvatarFallback>
                    {editedProfile.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Avatar
                </Button>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
