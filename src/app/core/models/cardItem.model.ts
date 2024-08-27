export interface CardItem {
  optionImg: 'img' | 'icon';
  icon: string;
  img: string;
  coloricon: string;
  title: string;
  route?: string;
  subtitle: string;
  optionFooter: 'footer' | 'button' | 'footerSpecial';
  button: string;
  colorButtom?: string;
  btnColorText?: string;
  onMethodAction: () => void;
}
