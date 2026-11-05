# Development history

This document describes the release's provenance. It is not a reconstruction of missing Git commits.

- **2026-08-12:** an earlier version was developed as **Teamplay**. A saved static package separates the five-game application into HTML, CSS, content, engine, interface and audio files.
- **2026-08-13:** the saved development record documents a Base44 integration under the GameTheory name, following a client/server version of Teamplay.
- **2026-08-14:** a saved Teamplay source package adds **Constellation** and **Lantern**, bringing the game set to the seven worlds retained in GameTheory. The package contains updated scripts, styles and artwork; it is a development snapshot, not the current community release.
- **September–October 2026:** the original application developed through a private repository with dated commits. It combined a standalone game engine with a hosted application wrapper.
- **2026-11-04:** a separate offline candidate was prepared from source revision `4f29de2c9a914817c5f203214f89af302cc63a7e`. Raster assets and recorded music were excluded, backend and account features omitted, and game-model equivalence checked.
- **2026-11-05:** the owner authorized an MIT community release. Public-release wording, separate storage keys, documentation and verification were prepared. This public repository begins with the community snapshot, not the original private ancestry.

Teamplay is part of GameTheory's development lineage, not an additional independent product in this release. The August engine and the public engine share the same seven-game structure and most implementation. Later changes include voting behavior and shortened dialogue substitutions. The public preview uses the later audited GameTheory source, not the older Teamplay package.

The dates above describe saved development records and source snapshots. They do not create historical commits in this public repository, establish third-party asset rights, or make the omitted artwork and hosted services part of this release.

The retained game engine matches the audited source engine byte for byte (SHA-256 `66c49d9ebaaeeb467fb00f5e3fadfa1077815f1fbcda1c97dba297de9a21eab1`). The release changes packaging, media and interface disclosures, not the game model.

GameTheory's design goal is an accessible, multiplayer-feeling learning experience that can be played with simulated characters when a live group session is unavailable.
