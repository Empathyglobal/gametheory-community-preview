# Community release notes

## 2026-11-05

This release is a self-contained source preview authorized by the project owner for publication under MIT. It is separate from the private application and does not change its running service.

### Included

- Seven game models and their local, rule-driven character behavior.
- Interface, educational explanations and local session history.
- 93 simple generated SVG images, including the favicon, replacing unverified raster artwork.
- Node-only static and model tests.

### Excluded

- All 92 original embedded raster images.
- Eleven recorded piano samples, their player and the musical score.
- React/Base44 wrapper, backend functions, accounts, OAuth, production configuration and original package dependencies.
- Original private Git ancestry and operational records.

No third-party runtime package is included in this standalone edition. The omitted recorded samples and original package dependencies have separate licenses; this MIT grant does not relicense or redistribute them. The replacement illustrations use simple geometry and text, not pixels from the original images. Original inline interface vectors, game code and educational text remain part of the owner-authorized application release.

### Functional differences

- Audio is silent and its controls say so.
- Raster artwork is replaced by geometric illustrations.
- The original wildcard session broadcast to an embedding parent has been removed.
- Browser storage keys use `gametheory-community:` and do not read or clear the original app's keys.
- The About link stays within the local release.
- External connections, media, plugins and form submissions are blocked by the content security policy.

### Limitations

This is not a security certification, a validated assessment, a live multiplayer service or a claim that every possible game path is correct. Full browser, mobile, accessibility and interrupted-flow verification remains outstanding. The private application's original package build, lint and dependency checks are not checks of this dependency-free edition and are not claimed to pass here.
