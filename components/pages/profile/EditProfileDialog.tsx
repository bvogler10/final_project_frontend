// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Edit, Upload} from "lucide-react"
// import { useRef, useState } from "react"

// export default function EditProfileDialog({ profile, onUpdate }: { profile: typeof userProfile, onUpdate: (profile: typeof User) => void }) {
//     const [editedProfile, setEditedProfile] = useState(profile)
//     const fileInputRef = useRef<HTMLInputElement>(null)
//     const [avatar, setAvatar] = useState()
  
//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault()
//       onUpdate(editedProfile)
//     }
  
//     const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0]
//       if (file) {
//         const reader = new FileReader()
//         reader.onloadend = () => {
//           setEditedProfile({ ...editedProfile, avatar: reader.result as string })
//         }
//         reader.readAsDataURL(file)
//       }
//     }
  
//     return (
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="outline">
//             <Edit className="w-4 h-4 mr-2" />
//             Edit Profile
//           </Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Profile</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="avatar">Avatar</Label>
//               <div className="flex items-center space-x-4">
//                 <Avatar className="w-16 h-16">
//                   <AvatarImage src={editedProfile.avatar} alt={editedProfile.username} />
//                   <AvatarFallback>{editedProfile.username[0].toUpperCase()}</AvatarFallback>
//                 </Avatar>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <Upload className="w-4 h-4 mr-2" />
//                   Upload New Avatar
//                 </Button>
//                 <Input
//                   id="avatar"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   ref={fileInputRef}
//                   onChange={handleAvatarChange}
//                 />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="bio">Bio</Label>
//               <Input
//                 id="bio"
//                 value={editedProfile.bio}
//                 onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
//               />
//             </div>
//             <div>
//               <Label htmlFor="link">Link</Label>
//               <Input
//                 id="link"
//                 value={editedProfile.link}
//                 onChange={(e) => setEditedProfile({ ...editedProfile, link: e.target.value })}
//               />
//             </div>
//             <Button type="submit">Save Changes</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     )
//   }
  
  