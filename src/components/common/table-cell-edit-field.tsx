import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useState } from "react";

const TableCellEditField = ({
  value,
  isEdit,
  onChange,
  toggleEdit,
}: {
  value: string;
  isEdit: boolean;
  onChange: (value: string) => void;
  toggleEdit: () => void;
}) => {
  const [editName, setEditName] = useState(value);

  return (
    <div className="text-left font-medium">
      {isEdit ? (
        <div className="flex items-center justify-start gap-1">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              onChange(editName);
            }}
          >
            <Check />
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              toggleEdit();
            }}
          >
            <X />
          </Button>
        </div>
      ) : (
        <span onClick={toggleEdit}>{value}</span>
      )}
    </div>
  );
};

export default TableCellEditField;
