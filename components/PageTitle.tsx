export default function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h2 className="text-xl font-semibold">{subtitle}</h2>
    </div>
  );
}
