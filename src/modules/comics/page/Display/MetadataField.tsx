export function MetadataField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex p-4 border-b border-black">
      <div className="w-1/4 text-center font-semibold">{label}</div>
      <div className="flex-1 text-center">{children}</div>
    </div>
  );
}
