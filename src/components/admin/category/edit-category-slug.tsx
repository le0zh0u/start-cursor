import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Check, Link, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EditCategorySlug = ({
  slug,
  categoryId,
}: {
  slug: string;
  categoryId: number;
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editSlug, setEditSlug] = useState(slug);

  const { mutate: changeCategorySlug } =
    api.category.changeCategorySlug.useMutation({
      onSuccess: () => {
        toast.success("Category slug updated");
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
            value={editSlug}
            onChange={(e) => setEditSlug(e.target.value)}
          />
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              changeCategorySlug({
                categoryId: categoryId,
                slug: editSlug,
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
        <div className="flex items-center justify-start gap-1">
          <span onClick={() => setEditOpen(!editOpen)}>{editSlug}</span>
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={() => window.open(`/category/${editSlug}`, "_blank")}
          >
            <Link />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditCategorySlug;
