import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EditCategoryName = ({
  name,
  categoryId,
}: {
  name: string;
  categoryId: number;
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(name);

  const { mutate: changeCategoryName } =
    api.category.changeCategoryName.useMutation({
      onSuccess: () => {
        toast.success("Category name updated");
        setEditOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <div className="text-left font-medium">
      {editOpen ? (
        <div className="flex items-center justify-start gap-1">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              changeCategoryName({
                categoryId: categoryId,
                name: editName,
              });
            }}
          >
            <Check />
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              setEditOpen(false);
            }}
          >
            <X />
          </Button>
        </div>
      ) : (
        <span onClick={() => setEditOpen(!editOpen)}>{editName}</span>
      )}
    </div>
  );
};

export default EditCategoryName;
