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

const EMPTY_VALUE = "__any__";

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
        value={value || EMPTY_VALUE}
        onValueChange={(newValue) => {
          console.log(newValue);
          const actualValue = newValue === EMPTY_VALUE ? "" : newValue;
          onValueChange(actualValue);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={EMPTY_VALUE} value={EMPTY_VALUE}>
            Any
          </SelectItem>
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
