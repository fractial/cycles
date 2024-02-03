# Cycles

## Overview

Cycles is a powerful command-line interface (CLI) tool crafted to streamline the automation of multiple console commands. This tool simplifies the management and execution of command sets, providing a convenient way to organize and efficiently run them.

## Usage

### Add

The `add` command allows you to incorporate new single or multiline commands into cycles.

```
cycles add --name <name> --type <type> --script <script>
```

- `name`: Specifies the unique identifier for the cycle (a-z, A-Z).

- `type` (Optional): Specifies the operating system for the cycle. If not specified, the tool automatically uses the current operating system.

- `script/s`: Specifies the script containing batch or bash commands separated by "||".

### Remove

The remove command enables the removal of a previously added cycle.

```
cycles remove <name>
```

- `name`: Specifies the name of the cycle to be removed.

### Run

The run command executes the predefined cycles.

```
cycles <name>[<index>]
```

- `name`: Specifies the name of the cycle to be executed.

- `index` (Optional): Runs a part of multicode with the index starting at 0.

### Storage

All created cycles are stored in an auto-generated `.cycles.json` file inside the `__dirname`. The file structure is as follows:

```
{
  "configurations": [
    {
      "type": "<type>",
      "name": "<name>",
      "scripts": [
        "<script1>",
        "<script2>",
        ...
      ]
    },
    ...
  ]
}
```
