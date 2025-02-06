type PublicLayoutPropType = {
  children: React.ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutPropType) => {
  return <div className="w-[100vw]">{children}</div>;
};
