---
layout: post
title:  "PreferenceFragmentCompat"
date:   2021-02-17 00:00:00 -0800
tags: Android PreferenceFragmentCompat PreferenceManager
load_lightbox: true
---
<style>
.my_container::after {
  content: "";
  clear: both;
  display: table;
  padding: 10px;
}
.my_screenshot {
  float: left;
  width: 20%;
  padding: 5px;
}
</style>
Android's *[SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences)* interface provides a means of privately storing and retrieving key-value data separately for each app installed on a device. This data persists across launches and is purged on uninstall. *[PreferenceFragmentCompat](https://developer.android.com/reference/androidx/preference/PreferenceFragmentCompat)* can be used in place of the *[Fragment](https://developer.android.com/reference/androidx/fragment/app/Fragment)* class in [activities](https://developer.android.com/reference/android/app/Activity) and in [navigation](https://developer.android.com/guide/navigation) to provide a light-weight UI for viewing and updating those SharedPreferences key-values.

<div class="my_container">
  <div class="my_screenshot">
    <a href="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614285898.png" data-lightbox="screenshot_1"><img src="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614285898.png"/></a>
  </div>
  <div class="my_screenshot">
    <a href="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614348267.png" data-lightbox="screenshot_2"><img src="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614348267.png"/></a>
  </div>
  <div class="my_screenshot">
    <a href="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614348275.png" data-lightbox="screenshot_3"><img src="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614348275.png"/></a>
  </div>
  <div class="my_screenshot">
    <a href="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614348291.png" data-lightbox="screenshot_4"><img src="https://sineausr931.github.io/SamplePreferences/doc/Screenshot_1614348291.png"/></a>
  </div>
</div>

The UI illustrated above may either be inflated from an XML document, or built in code. To inflate a *[PreferenceScreen](https://developer.android.com/reference/androidx/preference/PreferenceScreen)* from XML, first create a layout file with the *\<PreferenceScreen\>* tag as its root element. This layout file is stored under the *src/main/res/xml* directory of a module in Android projects.

{% gist 31dc7ef76d7eb3311b164c259b8d9140 settings.xml %}

Inside the *[onCreatePreferences](https://developer.android.com/reference/androidx/preference/PreferenceFragmentCompat#onCreatePreferences(android.os.Bundle,%20java.lang.String))* function of your *PreferenceFragmentCompat* subclass, call *[setPreferencesFromResource](https://developer.android.com/reference/androidx/preference/PreferenceFragmentCompat#setPreferencesFromResource(int,%20java.lang.String))* to load the layout and perform inflation. In terms of fragment lifecycle, *setPreferencesFromResource* will be called via the superclass's *onCreate* function.

<a href="https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:preference/preference/src/main/java/androidx/preference/PreferenceFragmentCompat.java;l=161;drc=e865a9bd80c7d405a694750786977d0eb2012e0f;bpv=0"><img src="/images/csandroid-onCreate.png"/></a>

Which means that any time there's a configuration change (e.g. rotation of the device), the *PreferenceScreen* needs to be recreated. Most of the code in the following *SettingsFragment.kt* example is dedicated to updating the preference summaries, either because of a device configuration change, or because of changes to the preference values via user interaction.

{% gist 31dc7ef76d7eb3311b164c259b8d9140 SettingsFragment.kt %}

To build a hierarchy from code, use *[PreferenceManager.createPreferenceScreen(Context)](https://developer.android.com/reference/androidx/preference/PreferenceManager#createPreferenceScreen(android.content.Context))* to create the root *PreferenceScreen*. Once you have added other *Preference* objects to this root screen with *[PreferenceGroup.addPreference(Preference)](https://developer.android.com/reference/androidx/preference/PreferenceGroup#addPreference(androidx.preference.Preference))*, you then need to set the screen as the root screen in your hierarchy with *[setPreferenceScreen(PreferenceScreen)](https://developer.android.com/reference/androidx/preference/PreferenceFragmentCompat#setPreferenceScreen(androidx.preference.PreferenceScreen))*.

An example project illustrating some of these techniques can be found [here](https://github.com/sineausr931/SamplePreferences).
