// import { useState } from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Heart, MessageCircle, Bookmark, Send } from 'lucide-react'
// import Image from 'next/image'

// interface Comment {
//   id: number;
//   username: string;
//   content: string;
//   timestamp: string;
// }

// interface PostDetailModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   post: {
//     id: number;
//     username: string;
//     avatar: string;
//     image: string;
//     caption: string;
//     likes: number;
//     timestamp: string;
//   };
// }

// export function PostDetailModal({ isOpen, onClose, post }: PostDetailModalProps) {
//   const [comments, setComments] = useState<Comment[]>([
//     { id: 1, username: 'crochetlover', content: 'This is beautiful! Can you share the pattern?', timestamp: '2 hours ago' },
//     { id: 2, username: 'yarnaddict', content: 'Love the color combination!', timestamp: '1 hour ago' },
//   ]);
//   const [newComment, setNewComment] = useState('');

//   const handleCommentSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       setComments([...comments, {
//         id: comments.length + 1,
//         username: 'currentuser',
//         content: newComment.trim(),
//         timestamp: 'Just now'
//       }]);
//       setNewComment('');
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[800px] p-0">
//         <div className="grid md:grid-cols-2 gap-0">
//           <div className="relative aspect-square">
//             <Image
//               src={post.image}
//               alt="Post image"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-l-lg"
//             />
//           </div>
//           <div className="flex flex-col h-full">
//             <DialogHeader className="p-4 border-b">
//               <div className="flex items-center gap-2">
//                 <Avatar>
//                   <AvatarImage src={post.avatar} alt={post.username} />
//                   <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
//                 </Avatar>
//                 <DialogTitle>{post.username}</DialogTitle>
//               </div>
//               <DialogDescription>{post.timestamp}</DialogDescription>
//             </DialogHeader>
//             <div className="flex-grow overflow-y-auto p-4">
//               <p className="mb-4">{post.caption}</p>
//               <div className="space-y-4">
//                 {comments.map((comment) => (
//                   <div key={comment.id} className="flex items-start gap-2">
//                     <Avatar className="w-8 h-8">
//                       <AvatarFallback>{comment.username[0].toUpperCase()}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="text-sm font-semibold">{comment.username}</p>
//                       <p className="text-sm">{comment.content}</p>
//                       <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="p-4 border-t">
//               <div className="flex justify-between mb-4">
//                 <div className="flex gap-2">
//                   <Button variant="ghost" size="sm">
//                     <Heart className="h-4 w-4 mr-1" />
//                     <span className="text-xs">{post.likes} Likes</span>
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     <MessageCircle className="h-4 w-4 mr-1" />
//                     <span className="text-xs">{comments.length} Comments</span>
//                   </Button>
//                 </div>
//                 <Button variant="ghost" size="sm">
//                   <Bookmark className="h-4 w-4 mr-1" />
//                   <span className="text-xs">Save</span>
//                 </Button>
//               </div>
//               <form onSubmit={handleCommentSubmit} className="flex gap-2">
//                 <Input
//                   placeholder="Add a comment..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   className="flex-grow"
//                 />
//                 <Button type="submit" size="sm">
//                   <Send className="h-4 w-4" />
//                   <span className="sr-only">Post comment</span>
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

