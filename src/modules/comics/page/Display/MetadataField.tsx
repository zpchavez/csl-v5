export function MetadataField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex p-4 border-b border-black">
      <div className="flex-1 text-center font-semibold">{label}</div>
      <div className="flex-2 text-center max-w-md">{children}</div>
    </div>
  );
}
