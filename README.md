# Cycles

## Overview

Cycles is a command-line interface (CLI) tool designed for automating multiple console commands. It simplifies the process of managing and executing sets of commands, making it easy to organize and run them efficiently.

## Usage

### Add

The `add` command is used to add a new single-/multiline commands to cycles.

```
cycles add --name <name> --type <type> --script <script>
```

`name` The name of the cycle.

`type` (Optional) The operating system for the cycle. If not specified, it automatically uses the current.

`script/s` The script containing batch or bash commands separated by "||".

### Run

```
cycles <name>[<index>]
```

`name` The name of the cycle.

`index` (Optional) Runs the multicode with the index starting by 0.
