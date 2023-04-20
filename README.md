# Two Patterns for Forcing Decisions in Lower Environments

This repo shows two recommended patterns for forcing decisions in lower environment(s).

## Install

```bash
npm install
```

## Option 1 – Stubs

Option 1 operates similar to a stub in a unit test. If the environment is not primary, it essentially reads a committed config file and returns a chosen value instead of calling the real Opti SDK. Notably, this pattern would ignore calls to `forceDecision`, as the Opti SDK would not actually be called in lower environments.

### Run

```bash
node lib/option1.js
```

## Run Option 2 – Forced Decisons

Option 2 leverages our existing forced decision method. With this option, a developer would iterate over a committed config file to force decisions. This has the advantage of working well with other calls to `forceDecision` in the code.

### Run

```bash
node lib/option2.js
```
