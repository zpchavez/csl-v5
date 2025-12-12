import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

type SelectFieldProps = {
  label: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function SelectField({
  label,
  onValueChange,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <div className="font-bold">{label}</div>
      <Select
        onValueChange={(value) => {
          console.log(value);
          onValueChange(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="any" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
