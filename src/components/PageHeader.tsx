interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 overflow-hidden py-12 md:mt-16">
      <div className="flex max-w-2xl flex-col gap-2">
        <h1 className="text-primary text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>

        {description && <p className="text-black/60 text-base md:text-lg">{description}</p>}
      </div>

      <div className="bg-primary h-1.5 w-full"></div>
    </div>
  );
}
