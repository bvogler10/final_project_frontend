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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

interface EditProfileDialogProps {
  profile: User;
}

export const EditProfileDialog: FC<EditProfileDialogProps> = ({ profile }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [link, setLink] = useState(editedProfile.link ?? "");
  const [bio, setBio] = useState(editedProfile.bio ?? "");
  const router = useRouter();
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
    const userId = await getUserId()
    console.log(bio, link, avatar);
    console.log(editedProfile);
    const formData = new FormData();
    console.log(formData);

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
    router.push(`/profiles/${userId}`);

  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={(e) => {
          setIsEditProfileOpen(true);
        }}
        className="w-full text-left hover:bg-secondary"
      >
        <Edit className="w-4 h-4 mr-2" />
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
