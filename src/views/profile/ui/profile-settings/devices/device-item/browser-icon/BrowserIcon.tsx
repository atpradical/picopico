import {
  BraveIcon,
  ChromeIcon,
  FirefoxIcon,
  ImageOutlineIcon,
  MSEdgeIcon,
  MSExplorerIcon,
  OperaIcon,
  SafariIcon,
  UcBrowserIcon,
  YandexIcon,
} from '@atpradical/picopico-ui-kit'

type BrowserIconProps = {
  browserName: string
  className?: string
}

export const BrowserIcon = ({ browserName, ...rest }: BrowserIconProps) => {
  switch (browserName) {
    case 'Chrome':
      return <ChromeIcon {...rest} />
    case 'Firefox':
      return <FirefoxIcon {...rest} />
    case 'Safari':
      return <SafariIcon {...rest} />
    case 'Opera':
      return <OperaIcon {...rest} />
    case 'Edge':
      return <MSEdgeIcon {...rest} />
    case 'Explorer':
      return <MSExplorerIcon {...rest} />
    case 'Yandex':
      return <YandexIcon {...rest} />
    case 'UC':
      return <UcBrowserIcon {...rest} />
    case 'Brave':
      return <BraveIcon {...rest} />
    default:
      return <ImageOutlineIcon {...rest} />
  }
}
