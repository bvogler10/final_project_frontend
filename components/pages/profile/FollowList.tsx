import { Follow } from "@/types/Follow";
import { FollowListItem } from "./FollowListItem";

interface FollowListProps {
  follows: Follow[];
}

export const FollowList: React.FC<FollowListProps> = ({ follows }) => {
  return (
    <div className="flex flex-col">
      {follows.map((follow, index) => (
        <div key={follow.id}>
          <FollowListItem follow={follow} />
          {index < follows.length - 1 && (
            <div className="border-b border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
};
