export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-[Lobster] text-[var(--primaryColor2)] dark:text-[var(--primaryColor3)] underline">
        {title}
      </h1>
      <span className="mt-1 flex-grow h-[2px] bg-gradient-to-r from-[var(--primaryColor2)] dark:from-[var(--primaryColor3)] to-transparent"></span>
    </div>
  );
}
