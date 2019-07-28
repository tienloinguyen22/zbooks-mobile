import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { recordError } from '@app/core';
import { ErrorText } from '../ErrorText';

interface State {
  hasError: boolean;
}

const ErrorMessage = () => {
  const { t } = useTranslation();
  return <ErrorText>{t('error.somethingWentWrong')}</ErrorText>;
};

export class ErrorBoundary extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, _info: any): void {
    recordError(error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
