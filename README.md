# 7ohm - Run parallel processes with no cost of external dependencies

<a href="https://www.npmjs.com/package/7ohm" alt="Downloads">
  <img src="https://img.shields.io/npm/dm/7ohm" />
</a>

<a href="https://www.npmjs.com/package/7ohm">
  <img src="https://img.shields.io/npm/v/7ohm" />
</a>

# Motivation
Super simple package that allows you to run concurrent processes across multiple shell types,
similar to [concurrently](https://www.npmjs.com/package/concurrently), but without burden of
external dependencies for functionality that useless in 99% cases.

So if you just want to run several processes in parallel on multiple platforms and don't want to
bring extra dependencies, then it's for you.

# Installation
```shell
npm i -g 7ohm
```

# Usage
In command line:

```shell
7ohm "command1 arg1 arg2" "command2 arg1 arg3"
```

In package.json scripts section:
```json
"scripts": {
  "command1": "command1 arg1 arg2",
  "command2": "command1 arg1 arg2",
  "dev": "7ohm \"npm run command1\" \"npm run command2\""
}
```

# Contribution

If you want to make PR, please keep it simple and NO EXTRA DEPENDENCIES. Feel free to report any
bugs since it was tested only on windows in bash and powershell by me.

