package com.mobile;
import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      super.onCreate(savedInstanceState);
  }
}
