import css from './FullPageLoader.module.css'

import aperture from '@/assets/aperture.svg'

interface FullPageLoaderProps {
  text?: string
}

const FullPageLoader = ({ text }: FullPageLoaderProps) => {
  return (
    <div className={css.root}>
      <div className={css.inner}>
        <img className={css.spin} src={aperture} alt="Loading..." />
        {text && <p className={css.text}>{text}</p>}
      </div>
    </div>
  )
}

export default FullPageLoader
