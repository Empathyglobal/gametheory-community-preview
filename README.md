# GameTheory

**Seven social-strategy simulations by Eric Gonzalez-Payne.** A single-player browser game about cooperation, trust, negotiation and shared resources, with three simulated characters at the table.

GameTheory began with a practical idea: make the social feel of a multiplayer learning game available even when a live session is not. The other participants are rule-driven computer characters, not people online. The community edition runs locally without an account, backend, subscription or AI API.

## The seven worlds

- **Shoal:** balance your catch against a shared, regenerating fish stock.
- **Collection:** bid from a limited budget for privately valued artworks.
- **City:** negotiate a harvest split while maintaining a shared city.
- **Signal:** choose between a cooperative hunt and an individual payoff.
- **Envelope:** send resources that multiply, then decide what to return.
- **Constellation:** coordinate safe and risky contributions to a shared network.
- **Lantern:** maintain a shared light while identifying a hidden saboteur.

A session selects three games. Characters' decisions, conversations and responses carry context between them. The simulation is intended to make social trade-offs tangible through play; it is not a validated psychological assessment or a substitute for live social interaction.

## Run it

Download this repository and open `index.html` in a modern browser. No installation or build step is needed. The accompanying `what-is-game-theory.html` introduces the concepts.

Alternatively, serve this directory with a static server, for example:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. File-origin storage behavior differs by browser; a local server gives more consistent storage behavior.

## What is in this release

This is a **standalone community source preview**, not the hosted application or a complete copy of its development history. It includes the game engine, interface, local character behavior and educational text, with simple geometric replacement artwork and no music. It excludes the account system, cloud services, backend, original raster art and recorded soundtrack.

- Plain HTML, CSS and JavaScript.
- No runtime package dependencies or remote resource URLs.
- No network calls, analytics, account login, cloud sync or live messaging.
- A restrictive content security policy blocks connections, media, plugins and form submissions.
- Original game-engine behavior retained; see [verification](VERIFICATION.md).

**Verification limit:** automated game-model and static checks pass. Full browser interaction, rendering, mobile and accessibility testing of this release has not yet been completed. It is offered for exploration and development, not as a production-ready or independently safety-certified service.

## Local privacy and simulated social play

Nicknames, chats, session summaries and character memory may be stored in this browser's local storage. Do not enter real personal or sensitive information, especially on a shared device. Use the in-game history controls to clear this edition's stored history. Its keys are namespaced separately from the original app.

Copy controls can put a report on the device clipboard. In-game reports are local records, not messages to a human moderator. Rule-based language checks do not guarantee safeguarding. Adults should review the experience before using it with children.

Hidden roles and pending decisions can be inspected in developer tools. This is educational simulated play, not cheat-resistant multiplayer. The game does not connect players to strangers or call an AI service.

## Tests

With Node.js installed:

```sh
node tests/verify-candidate.cjs
node tests/engine-smoke.cjs index.html
```

The first checks script syntax, network-related patterns, image formats, storage namespacing and the silent audio interface. The second exercises all seven game models across 420 complete sessions. Neither command is a browser test.

## Project and license

Created by **Eric Gonzalez-Payne**, educator and builder of learning tools. More projects: [github.com/Empathyglobal](https://github.com/Empathyglobal).

The included code, text and replacement vector artwork are released under the [MIT License](LICENSE), copyright Eric Gonzalez. The license does not grant rights to omitted media, third-party brands or hosted services. See [release notes](RELEASE_NOTES.md) for scope and [development history](DEVELOPMENT_HISTORY.md) for provenance.
