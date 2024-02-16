import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface AlertProps {
  title: string
  className?: string
  children: React.ReactNode
  type?: 'error' | 'warning' | 'info'
  icon?: boolean
}

const getIcon = (type: string) => {
  switch (type) {
    case 'error':
      return XCircleIcon
    case 'warning':
      return ExclamationTriangleIcon
    default:
      return InformationCircleIcon
  }
}

const getColorClasses = (type: string) => {
  switch (type) {
    case 'error':
      return {
        bg: 'bg-red-50',
        icon: 'text-red-400',
        title: 'text-red-800',
        text: 'text-red-700',
      }
    case 'warning':
      return {
        bg: 'bg-yellow-50',
        icon: 'text-yellow-400',
        title: 'text-yellow-800',
        text: 'text-yellow-700',
      }
    default:
      return {
        bg: 'bg-blue-50',
        icon: 'text-blue-400',
        title: 'text-blue-800',
        text: 'text-blue-700',
      }
  }
}

export default function Alert({
  children,
  type = 'info',
  title,
  className,
  icon = true,
}: AlertProps) {
  const Icon = getIcon(type)
  const colors = getColorClasses(type)

  return (
    <div className={clsx(`rounded-md ${colors.bg} p-4`, className)}>
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0">
            <Icon aria-hidden="true" className={`h-5 w-5 ${colors.icon}`} />
          </div>
        )}
        <div className="ml-3">
          <h3 className={`text-sm mt-0 font-medium ${colors.title}`}>
            {title}
          </h3>
          <div className={`mt-2 text-sm ${colors.text}`}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
