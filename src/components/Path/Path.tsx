import { FC, Fragment } from 'react'
import classNames from 'classnames';
import Home from '../../images/Home.png';
import Arrow from '../../images/path_stroke.svg'

export const Path: FC = () => {
  const paths = ["favorite", "apple-iphone-11-pro-max-64gb-gold"];

  return (
    <div className="path">
      <img
        className='path__img-home'
        src={ Home }
        alt="Home"
      />
      {paths && paths.map((path, i) => {
        const isLast = i === paths.length - 1;

        return (
          <Fragment key={path}>
            <img
              className='path__img-arrow'
              src={ Arrow }
              alt="arrow"
            />
            <span className={classNames(
              'path__name',
              {
                'path__name--color-white': !isLast,
                'path__name--color-grey': isLast
              },
            )}>{path}</span>
          </Fragment>
        )
      })}
    </div>
  )
}
