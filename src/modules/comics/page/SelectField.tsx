import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

type SelectFieldProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string; count?: number }[];
};

export function SelectField({
  label,
  value,
  onValueChange,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <div className="font-bold">{label}</div>
      <Select
        value={value}
        onValueChange={(newValue) => {
          console.log(newValue);
          onValueChange(newValue);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="any" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}{" "}
              {option.count !== undefined ? `(${option.count})` : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
