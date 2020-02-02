export interface ScreenProps {
  componentId: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  rightIcon?: string;
  rightIconColor?: string;
  onRightButtonPress: () => void;
}
