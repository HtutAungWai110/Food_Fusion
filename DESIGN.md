---
name: Food Fusion
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#594238'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#8c7166'
  outline-variant: '#e0c0b2'
  surface-tint: '#a23f00'
  primary: '#9e3d00'
  on-primary: '#ffffff'
  primary-container: '#c64f00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb595'
  secondary: '#3b6934'
  on-secondary: '#ffffff'
  secondary-container: '#b9eeab'
  on-secondary-container: '#3f6d38'
  tertiary: '#605b54'
  on-tertiary: '#ffffff'
  tertiary-container: '#79746c'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcd'
  primary-fixed-dim: '#ffb595'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7c2e00'
  secondary-fixed: '#bcf0ae'
  secondary-fixed-dim: '#a1d494'
  on-secondary-fixed: '#002201'
  on-secondary-fixed-variant: '#23501e'
  tertiary-fixed: '#e9e1d7'
  tertiary-fixed-dim: '#cdc5bc'
  on-tertiary-fixed: '#1e1b15'
  on-tertiary-fixed-variant: '#4a463f'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  button:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The brand personality is defined by a "Sophisticated Culinary Workshop" aesthetic. This design system bridges the gap between high-end editorial gastronomy and the warmth of a home kitchen. It seeks to evoke feelings of inspiration, reliability, and community.

The chosen style is **Minimalism with Tactile influences**. By utilizing expansive whitespace, the design allows high-resolution food photography to serve as the primary visual driver. However, the use of earthy color accents and rich typography prevents the interface from feeling clinical. The visual language focuses on the "art of the ingredient," using subtle organic textures and a structured layout to celebrate the process of cooking.

## Colors

The palette is rooted in the natural world. The primary color is a rich **Terracotta**, chosen for its ability to stimulate appetite and provide a sense of artisanal craft. This is balanced by a **Deep Forest Green** secondary color, representing freshness and organic ingredients.

The background uses a warm off-white (Cream) rather than a pure clinical white to maintain the approachable, "tablecloth" feel of the interface. **Charcoal** is used for primary text and iconography to ensure high legibility without the harshness of pure black. High-contrast "Alert" states should utilize the primary Terracotta to maintain brand harmony even in functional messaging.

## Typography

This design system employs a classic typographic pairing to establish authority and warmth. **Noto Serif** is used for all headlines; its elegant terminals and traditional structure evoke the feeling of a well-loved cookbook. 

For body copy and functional UI elements, **Be Vietnam Pro** provides a clean, contemporary contrast. Its open counters and modern proportions ensure high readability during task-heavy activities like following recipes. Use the `label-caps` style for category tags and metadata to create a distinct hierarchy that doesn't compete with the editorial headlines.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to maintain the editorial integrity of the content, centered within the viewport. A 12-column grid is utilized for complex pages like recipe indices, while a single-column, focused "Reader Mode" layout is used for individual recipe articles.

The spacing rhythm is based on an 8px base unit. Generous vertical padding (64px to 96px) between sections is encouraged to create a "breathable" experience that mirrors a premium magazine. Gutters are kept wide to prevent the UI from feeling cluttered, emphasizing the "Minimalist" brand pillar.

## Elevation & Depth

Visual hierarchy in this design system is primarily achieved through **Tonal Layers** and **Ambient Shadows**. Surfaces do not "float" aggressively; instead, they sit subtly above the base layer to suggest a physical stack of papers or ingredients.

Shadows should be extremely diffused, using the Charcoal neutral color at low opacities (5-10%) with a significant blur radius. This creates a "soft light" effect, similar to professional food photography lighting. Avoid heavy borders or high-contrast outlines; instead, use slight shifts in background color (e.g., from Cream to a slightly darker Oatmeal) to define distinct content areas.

## Shapes

The shape language is **Soft**. A subtle 0.25rem (4px) corner radius is applied to standard UI elements like input fields and small buttons. Larger containers, such as recipe cards or featured imagery, use a more pronounced `rounded-lg` (8px) or `rounded-xl` (12px) radius.

This "Soft" approach mimics the natural curves found in organic ingredients and kitchenware, avoiding the clinical feel of sharp 0px corners while maintaining the professional structure required for a sophisticated brand.

## Components

### Buttons
Primary buttons use the Terracotta background with White text, featuring a subtle lift on hover. Secondary buttons use the Forest Green as a text color with a thin, low-opacity border.

### Cards
Recipe cards are the cornerstone of the system. They feature a full-width image at the top with a subtle "soft" radius. Below the image, Noto Serif headlines are paired with Be Vietnam Pro metadata (e.g., prep time, difficulty).

### Inputs & Forms
Form fields utilize the off-white tertiary color for the background to distinguish them from the main page body. Focused states are indicated by a 2px Terracotta bottom-border rather than a full outline, maintaining a clean, editorial look.

### Chips & Tags
Used for dietary restrictions or meal categories. These are styled with the Forest Green at 10% opacity for the background and 100% opacity for the text, using the `label-caps` typography.

### Imagery
All photography must follow a "Macro-Perspective" or "Top-Down" style with high color saturation and natural lighting. Deep shadows in photos are encouraged to add drama and sophistication to the page.