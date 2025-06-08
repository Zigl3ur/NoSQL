import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface CustomQueryFormProps {
  filterProjPlaceholder: string;
  filterProj: string;
  onChangeFilterProj: (value: string) => void;
  limit?: string;
  onChangeLimit?: (value: string) => void;
  sort: string;
  onChangeSort: (value: string) => void;
  skip: string;
  onChangeSkip: (value: string) => void;
}

export default function CustomQueryForm({
  filterProjPlaceholder,
  filterProj,
  onChangeFilterProj,
  limit,
  onChangeLimit,
  sort,
  onChangeSort,
  skip,
  onChangeSkip,
}: CustomQueryFormProps) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder={filterProjPlaceholder || ""}
        value={filterProj}
        onChange={(e) => onChangeFilterProj(e.target.value)}
        className="min-h-50"
      />
      {onChangeLimit && (
        <Input
          placeholder="number of documents to show"
          value={limit || ""}
          onChange={(e) => onChangeLimit(e.target.value)}
        />
      )}
      <Input
        placeholder='sort by a criteria like: { "rating": -1 }'
        value={sort}
        onChange={(e) => onChangeSort(e.target.value)}
      />
      <Input
        placeholder="skip a number of documents"
        value={skip}
        onChange={(e) => onChangeSkip(e.target.value)}
      />
    </div>
  );
}
