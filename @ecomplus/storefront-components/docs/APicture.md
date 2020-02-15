# APicture

- Supports both single `src` string and picture object:
  - ```json
  {
      "zoom": {
          "url": "https://ecom-jvxboxzk.sfo2.digitaloceanspaces.com/@v2-1581704558843-display_hero_hw__d73ne9vbdmgm_large.jpg",
          "size": "1136x667",
          "alt": "display_hero_hw__d73ne9vbdmgm_large"
      },
      "big": {
          "url": "https://ecom-jvxboxzk.sfo2.digitaloceanspaces.com/imgs/big/@v2-1581704558843-display_hero_hw__d73ne9vbdmgm_large.jpg.webp",
          "size": "700x411",
          "alt": "display_hero_hw__d73ne9vbdmgm_large"
      },
      "normal": {
          "url": "https://ecom-jvxboxzk.sfo2.digitaloceanspaces.com/imgs/normal/@v2-1581704558843-display_hero_hw__d73ne9vbdmgm_large.jpg.webp",
          "size": "350x206",
          "alt": "display_hero_hw__d73ne9vbdmgm_large"
      }
  }
  ```
- Lazy load with fixed margin and threshold;
- Responsive image load (best fit with container width);
- Supporting `<picture>` with source by types (webp and jpeg/png);
- Additional fall-back src;
- Background placeholder with aspect ratio image height;
- Load fade transitions;
