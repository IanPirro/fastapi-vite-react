interface EmptyStateProps {
  title: string
  description: string
  action: React.ReactNode
  icon?: React.ReactNode
}

const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  return (
    <div className="relative flex flex-col items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm">
      {icon && icon}
      <h3 className="mt-2 text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-base text-gray-500">{description}</p>
      <div className="mt-6">{action}</div>
    </div>
  )
}

export default EmptyState
