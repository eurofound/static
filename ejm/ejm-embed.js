'use strict';
const WATERMARK_URL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iTGF5ZXJfMSIKICAgc29kaXBvZGk6ZG9jbmFtZT0ibG9nby5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgd2lkdGg9IjI5MXB4IgogICBoZWlnaHQ9IjI5MXB4IgogICB2aWV3Qm94PSIwIDAgMjkxIDI5MSIKICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjkxIDI5MSIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMjEiPjxyZGY6UkRGPjxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgICAgaWQ9ImRlZnMzIj48aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTU1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMwMi41IDogOTcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNjA1IDogMTQ1LjUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDE0NS41IDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiIC8+PC9kZWZzPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3NDkiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjExMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMjQ0IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjgxNCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNTQ2IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9IkxheWVyXzEiCiAgICAgaW5rc2NhcGU6Y3k9IjE0NS41IgogICAgIGlua3NjYXBlOmN4PSItMTUyLjQ5NTc2IgogICAgIGlua3NjYXBlOnpvb209IjAuODEwOTk2NTYiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6IzY2NjY2NjtmaWxsLW9wYWNpdHk6MSIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoNCIKICAgICBkPSJtIDI1MC4wNDI5OCw5My40NTA0MDcgLTMuNjcyMjMsLTMuNjQ3ODE1IC0yNi4wNTkxMywtMjYuMDc2MjU5IC0zLjY0OTQ3LC0zLjY4NjM1MiBjIC04Ljg2MjM5LC04LjgzODI0OSAtMjMuMTgxOTUsLTguODM4MjQ5IC0zMi4wMTY4LDAgbCAtMS4xOTg3MiwxLjE3MTk1MiAtMjkuMzc3MTQsMjkuNDA5MDcgLTIuODc3MTksMi44OTUwOTIgYyAtOC44MzM4Nyw4Ljg0NzMwNSAtOC44MzM4NywyMy4xOTQ4ODUgMCwzMi4wMzE3NzUgbCAxLjU2NDQyLDEuNjEwMDYgMy43NjYzNCwzLjc2MTk3IDEzLjAxNzIyLC0xMy4wNDU1MyAtNS4yOTQ2NywtNS4zMjQ0NCBjIC0xLjY1NTYsLTEuNjYwOTUgLTEuNjU1NiwtNC4zNDE3NiAwLC01Ljk5MjY5IGwgMi4yNjc0MiwtMi4zMTcxNCAyOS42ODAwOSwtMjkuNjkyMzUzIDEuNDU0MjYsLTEuNDE3MDg3IGMgMS42NDYxNiwtMS42NjE0NDIgNC4zMzMzOSwtMS42NjE0NDIgNS45ODgxMiwwIGwgMS4xNTY4NywxLjE0NDMxNiAzMS4wMTk0MiwzMS4wNTI4OTQgMS4xNTYwOCwxLjE1NDM0IGMgMS42NTE4MSwxLjY1MTgxIDEuNjUxODEsNC4zMzU0NCAwLDUuOTk2MzkgbCAtMS40MTYzLDEuNDM0NyAtOS45MTc3Niw5LjkyNDY3IDE4LjAzMjY4LDAgMS42NTM3NSwwIDAsMS42NTQ3MyAwLDQuNzI0NjkgMy41NTI1NSwtMy41NTYwNSAxLjE3MDE5LC0xLjE2ODY0IGMgOC44MzIwMywtOC44NDIwNSA4LjgzMjAzLC0yMy4xNzc3NiAwLC0zMi4wNDIyOTMgeiIgLz48cGF0aAogICAgIHN0eWxlPSJmaWxsOiM2NjY2NjY7ZmlsbC1vcGFjaXR5OjEiCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICBpZD0icGF0aDYiCiAgICAgZD0ibSAxOS41MzYzODUsMTczLjM1MzQ3IDIxLjMwMzk4MSwwIDAsNC40NzE4NyAtMTYuMTYwMzUyLDAgMCwxMS40OTAwNiAxMy4xNDY0NCwwIDAsNC40NzE4NyAtMTMuMTQ2NDQsMCAwLDExLjgwMTg1IDE3LjA0Mzc2OSwwIDAsNC40NzE4NyAtMjIuMTg3Mzk4LDAgMCwtMzYuNzA3NTIgeiIgLz48cGF0aAogICAgIHN0eWxlPSJmaWxsOiM2NjY2NjY7ZmlsbC1vcGFjaXR5OjEiCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICBpZD0icGF0aDgiCiAgICAgZD0ibSA0Ni41NTY3ODUsMTgzLjc1MjQ1IDUuMDQwMDg3LDAgMCwxNS43MDE1MSBjIDAsMy42NDAyMyAwLjcyNzYxNiw2LjU1MDUgNC45Mzc1MTgsNi41NTA1IDUuMzUxNjg2LDAgOC41MjEzOTgsLTQuNzMxMyA4LjUyMTM5OCwtOS45MzAzMSBsIDAsLTEyLjMyMTcgNS4wNDAwODYsMCAwLDI2LjMwODU0IC00Ljg4NDI4NywwIDAsLTMuNDg0MzIgYyAwLC0xLjA5MTA4IDAuMTAzNTQyLC0xLjkyMzcxIDAuMTAzNTQyLC0xLjkyMzcxIGwgLTAuMTAzNTQyLDAgYyAtMS4wOTEzNzcsMi42MDA0MyAtNC41MjA1MjcsNi4wMzE2MyAtOS42NjUwMzIsNi4wMzE2MyAtNS45MjM1MDMsMCAtOC45ODk3NywtMy4xMTk0IC04Ljk4OTc3LC0xMC4wODYzMSBsIDAsLTE2Ljg0NTgzIHoiIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojNjY2NjY2O2ZpbGwtb3BhY2l0eToxIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaWQ9InBhdGgxMCIKICAgICBkPSJtIDc2LjY0MzQ1MiwxODMuNzUyNDUgNC44ODQyODcsMCAwLDQuNTc1NCBjIDAsMS4wOTEyIC0wLjEwMzU0MiwxLjk3NTEgLTAuMTAzNTQyLDEuOTc1MSBsIDAuMTAzNTQyLDAgYyAxLjE5NTAxNSwtMy44NDc0MSA0LjI2MTE4NiwtNi44NjIzIDguMzE0NDEzLC02Ljg2MjMgMC42NzUzNiwwIDEuMjk4NDYsMC4xMDM2NCAxLjI5ODQ2LDAuMTAzNjQgbCAwLDQuOTkwODQgYyAwLDAgLTAuNjc0MzksLTAuMTU1ODggLTEuNDU0MjYsLTAuMTU1ODggLTMuMjIxMDk1LDAgLTYuMTgyODQ3LDIuMjg3NzUgLTcuMzc4NzM4LDYuMTg3NDEgLTAuNDY4Mjc2LDEuNTA3NDkgLTAuNjI0MDc1LDMuMTE5NCAtMC42MjQwNzUsNC43MzE0IGwgMCwxMC43NjI5MyAtNS4wNDAwODcsMCAwLC0yNi4zMDg1NCB6IiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6IzY2NjY2NjtmaWxsLW9wYWNpdHk6MSIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoMTIiCiAgICAgZD0ibSAxMDYuODg2ODksMTgzLjEyODg2IGMgNy44NDU5NSwwIDE0LjE4NTU2LDUuNzcxMjEgMTQuMTg1NTYsMTMuNzI1NTUgMCw4LjAwNjcxIC02LjMzOTYxLDEzLjgzMDE4IC0xNC4xODU1NiwxMy44MzAxOCAtNy44NDcwMDgsMCAtMTQuMTg1NjQ4LC01LjgyMzQ3IC0xNC4xODU2NDgsLTEzLjgzMDE4IDAsLTcuOTU0MzQgNi4zMzg2NCwtMTMuNzI1NTUgMTQuMTg1NjQ4LC0xMy43MjU1NSB6IG0gMCwyMy4xODgyNyBjIDQuOTg3ODMsMCA5LjA0MDk2LC0zLjk1MDk1IDkuMDQwOTYsLTkuNDYyNzIgMCwtNS40NTk0MSAtNC4wNTMxMywtOS4zNTkxNyAtOS4wNDA5NiwtOS4zNTkxNyAtNC45MzY2NSwwIC05LjA0MjAxOCwzLjg5OTc2IC05LjA0MjAxOCw5LjM1OTE3IDAsNS41MTE3NyA0LjEwNTM2OCw5LjQ2MjcyIDkuMDQyMDE4LDkuNDYyNzIgeiIgLz48cGF0aAogICAgIHN0eWxlPSJmaWxsOiM2NjY2NjY7ZmlsbC1vcGFjaXR5OjEiCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICBpZD0icGF0aDE0IgogICAgIGQ9Im0gMTI2Ljk0NTU1LDE4OC4xNzE5NyAtMy4yNzMyNiwwIDAsLTQuMDU2NTQgMy4yNzMyNiwwIDAsLTEuMjQ2OTggYyAwLC04LjY4MzMzIDYuNTQ2NiwtOS43NzQ1MSA5Ljg3MzA4LC05Ljc3NDUxIDEuMTQyNzYsMCAxLjkyMjY0LDAuMTU1ODkgMS45MjI2NCwwLjE1NTg5IGwgMCw0LjMxNTEgYyAwLDAgLTAuNTIwNTQsLTAuMTA0NTEgLTEuMjk5NTMsLTAuMTA0NTEgLTEuOTIyNTQsMCAtNS41MDc0LDAuNjI0MzcgLTUuNTA3NCw1LjUxMTY3IGwgMCwxLjE0MzM0IDYuMjM1MTEsMCAwLDQuMDU2NTQgLTYuMjM1MTEsMCAwLDIxLjg4OTAyIC00Ljk4ODc5LDAgMCwtMjEuODg5MDIgeiIgLz48cGF0aAogICAgIHN0eWxlPSJmaWxsOiM2NjY2NjY7ZmlsbC1vcGFjaXR5OjEiCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICBpZD0icGF0aDE2IgogICAgIGQ9Im0gMTUzLjkxNDY2LDE4My4xMjg4NiBjIDcuODQ2MDQsMCAxNC4xODU1Niw1Ljc3MTIxIDE0LjE4NTU2LDEzLjcyNTU1IDAsOC4wMDY3MSAtNi4zMzk1MiwxMy44MzAxOCAtMTQuMTg1NTYsMTMuODMwMTggLTcuODQ3MDEsMCAtMTQuMTg1NTYsLTUuODIzNDcgLTE0LjE4NTU2LC0xMy44MzAxOCAwLC03Ljk1NDM0IDYuMzM4NTUsLTEzLjcyNTU1IDE0LjE4NTU2LC0xMy43MjU1NSB6IG0gMCwyMy4xODgyNyBjIDQuOTg3ODMsMCA5LjA0MTA2LC0zLjk1MDk1IDkuMDQxMDYsLTkuNDYyNzIgMCwtNS40NTk0MSAtNC4wNTMyMywtOS4zNTkxNyAtOS4wNDEwNiwtOS4zNTkxNyAtNC45Mzc1MiwwIC05LjA0MTkzLDMuODk5NzYgLTkuMDQxOTMsOS4zNTkxNyAwLDUuNTExNzcgNC4xMDQ0MSw5LjQ2MjcyIDkuMDQxOTMsOS40NjI3MiB6IiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6IzY2NjY2NjtmaWxsLW9wYWNpdHk6MSIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoMTgtMyIKICAgICBkPSJtIDE3Mi4zNjE1LDE4My43NTI0NSA1LjA0MDA5LDAgMCwxNS43MDE1MSBjIDAsMy42NDAyMyAwLjcyNzUxLDYuNTUwNSA0LjkzNjQ1LDYuNTUwNSA1LjM1MjY2LDAgOC41MjE0OSwtNC43MzEzIDguNTIxNDksLTkuOTMwMzEgbCAwLC0xMi4zMjE3IDUuMDQwMDksMCAwLDI2LjMwODU0IC00Ljg4NDI5LDAgMCwtMy40ODQzMiBjIDAsLTEuMDkxMDggMC4xMDQ0MiwtMS45MjM3MSAwLjEwNDQyLC0xLjkyMzcxIGwgLTAuMTA0NDIsMCBjIC0xLjA5MDUsMi42MDA0MyAtNC41MTk2NSw2LjAzMTYzIC05LjY2NDE1LDYuMDMxNjMgLTUuOTIzNSwwIC04Ljk4OTY4LC0zLjExOTQgLTguOTg5NjgsLTEwLjA4NjMxIGwgMCwtMTYuODQ1ODMgeiIgLz48cGF0aAogICAgIHN0eWxlPSJmaWxsOiM2NjY2NjY7ZmlsbC1vcGFjaXR5OjEiCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICBpZD0icGF0aDIwIgogICAgIGQ9Im0gMjAyLjQ0ODA3LDE4My43NTI0NSA0Ljg4NDI5LDAgMCwzLjQ4MzM1IGMgMCwxLjAzOTggLTAuMTA0NDIsMS45MjM3IC0wLjEwNDQyLDEuOTIzNyBsIDAuMTA0NDIsMCBjIDEuMDM5MjEsLTIuMjg3NzUgNC4xNTY3NywtNi4wMzA2NCA5Ljg3MzA5LC02LjAzMDY0IDYuMTgzODIsMCA5LjA0MTA2LDMuMzc4OTQgOS4wNDEwNiwxMC4wODYzIGwgMCwxNi44NDU4MyAtNS4wNDAwOSwwIDAsLTE1LjcwMjQ4IGMgMCwtMy42OTE1MSAtMC43Nzk4OCwtNi42MDI3NiAtNC45ODg4LC02LjYwMjc2IC00LjAwMDk3LDAgLTcuMjIyOTUsMi42NTE3MSAtOC4zMTMzNCw2LjQ0Njk2IC0wLjMxMTYsMS4wMzk3IC0wLjQxNjEyLDIuMjM2MzcgLTAuNDE2MTIsMy41MzU2IGwgMCwxMi4zMjI2OCAtNS4wNDAwOSwwIDAsLTI2LjMwODU0IHoiIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojNjY2NjY2O2ZpbGwtb3BhY2l0eToxIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaWQ9InBhdGgyMi03IgogICAgIGQ9Im0gMjQyLjYxNDkxLDE4My4xMjg4NiBjIDYuMDgwMTgsMCA4LjEwNjM1LDQuMTU5MiA4LjEwNjM1LDQuMTU5MiBsIDAuMTA0NDIsMCBjIDAsMCAtMC4xMDQ0MiwtMC43ODAyNiAtMC4xMDQ0MiwtMS43Njc4MSBsIDAsLTEyLjE2Njc4IDUuMDQwMDksMCAwLDM2LjcwNzUyIC00Ljc3OTg3LDAgMCwtMi40OTU4IGMgMCwtMS4wMzk5IDAuMDUxMywtMS43Njc5MSAwLjA1MTMsLTEuNzY3OTEgbCAtMC4xMDI1NiwwIGMgMCwwIC0yLjEzMTU3LDQuODg3MzEgLTguNjI2ODgsNC44ODczMSAtNy4xMTg0MywwIC0xMS41ODY3LC01LjYxNTMyIC0xMS41ODY3LC0xMy43Nzc5MSAwLC04LjM3MTU1IDQuOTM1NjcsLTEzLjc3NzgyIDExLjg5ODI5LC0xMy43Nzc4MiB6IG0gMC42NzYzMywyMy4xODgyNyBjIDMuODk2NDYsMCA3LjU4NTcyLC0yLjc1NTM1IDcuNTg1NzIsLTkuNDYyNzIgMCwtNC42NzkwNSAtMi40NDExMiwtOS4zNTkxNyAtNy40Mjk5MiwtOS4zNTkxNyAtNC4xNTY3NiwwIC03LjU4NTgxLDMuNDMyMTcgLTcuNTg1ODEsOS40MTE0NCAwLDUuNzE4OTQgMy4wNjUyOSw5LjQxMDQ1IDcuNDMwMDEsOS40MTA0NSB6IiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6IzY2NjY2NjtmaWxsLW9wYWNpdHk6MSIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoMjQtMiIKICAgICBkPSJtIDE4NS40NDcwMywxMTIuMjI2NzYgLTExLjYwNDcsMTEuNjExMjEgMjUuOTM3NTksMCBjIDcuNTEwNjksLTguODkzNDMgNy4wOTE3NSwtMjIuMjI4MzcgLTEuMjg0MjYsLTMwLjYwNjYxNiBsIC01LjUwMzY5LC01LjUzOTIxIC0xMy4wMjY3NCwxMy4wMjgzOTYgNS40ODE4LDUuNTA1MDYgYyAxLjY1ODUyLDEuNjYxODMgMS42NTg1Miw0LjM0MjYzIDAsNi4wMDExNiB6IiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6IzY2NjY2NjtmaWxsLW9wYWNpdHk6MSIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoMjYtNSIKICAgICBkPSJtIDE3MC42ODY4MywxMjYuOTk0OTQgLTE4LjY1MDA0LDE4LjY2MDM0IGMgLTEuNjQ0MzEsMS42NTI3OCAtNC4zMzI0MSwxLjY1Mjc4IC01Ljk4MTQsMCBsIC0zMy4zMzkxLC0zMy4zNTkxNCBjIC0xLjY0ODk5LC0xLjY1MzM2IC0xLjY0ODk5LC00LjMzOTMzIDAsLTUuOTk2IGwgMS40MTkxMywtMS40NDA4MyAyOS42OTE0OCwtMjkuNjkzMjMgMi4zMDUzNiwtMi4yODkyMTUgYyAxLjYzODU4LC0xLjY1MjM5MSA0LjMzMDU3LC0xLjY1MjM5MSA1Ljk4MTQxLDAgbCA0Ljg4MTQ3LDQuODYxMTI3IDEzLjAxNTM1LC0xMy4wMzAzNDUgLTQuODk2NjQsLTQuODg1MjYgYyAtOC44NTQ4LC04Ljg0NTQ1IC0yMy4xODM5LC04Ljg0NTQ1IC0zMi4wMTc3NiwwIGwgLTIuODk4MTIsMi44ODMyMTkgLTMwLjU1Mjk4OCwzMC41ODA5MjUgYyAtOC44MzMsOC44NDI1MzkgLTguODMzLDIzLjE5NjgzOSAwLDMyLjAzNDIwOSBsIDI5LjczMDM5OCwyOS43MzgyOCAzLjY1MjI5LDMuNjY5NzIgYyA4Ljg0NDM4LDguODU0NSAyMy4xODM4OSw4Ljg1NDUgMzIuMDIxNTYsMCBsIDEuMTc1OTQsLTEuMTYzMjkgNC40NjE2NiwtNC40NjYyMyAwLC0yNi4xMDQyOCB6IiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6IzY2NjY2NjtmaWxsLW9wYWNpdHk6MSIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoMjgtOSIKICAgICBkPSJtIDE3Mi4zNDA1OCwxMjUuNDkyNyAwLDQ3Ljc0MTk1IDcxLjMyNTkxLDAgMCwtNDcuNzQxOTUgLTcxLjMyNTkxLDAgeiBtIDQ5LjUwMjI3LDEyLjQzOTE1IDAuNzM1MiwyLjMyMDA4IDIuNDgxMTMsMCAtMS45OTk1MiwxLjQ5ODgyIDAuNzc4OTEsMi4zODAwMSAtMS45OTU3MiwtMS40NjY2MiAtMS45ODYyOCwxLjQ2NjYyIDAuNzgzNjcsLTIuMzgwMDEgLTIuMDE5MzYsLTEuNDk4ODIgMi40NzI1NSwwIDAuNzQ5NDIsLTIuMzIwMDggeiBtIC02LjU4ODQ1LC0zLjUyNTI5IDAuNzUyMzMsLTIuMzIwOTMgMC43Mjk1NiwyLjMyMDkzIDIuNDg1NzksMCAtMi4wMDEzNSwxLjQ5Nzk2IDAuNzc0MTMsMi4zODI4MyAtMS45ODgxMywtMS40Njg0NyAtMS45OTY2OCwxLjQ2ODQ3IDAuNzg2NTksLTIuMzgyODMgLTIuMDE5NDcsLTEuNDk3OTYgMi40NzcyMywwIHogbSAtMTUuOTg0NiwwLjAxOTEgMC43NDY1OCwtMi4zMjEwMyAwLjczNTIyLDIuMzIxMDMgMi40ODExMiwwIC0yLjAwMTQ2LDEuNTAzNiAwLjc3NjA3LDIuMzc5OTEgLTEuOTkwOTUsLTEuNDcxMjkgLTEuOTkwOTMsMS40NzEyOSAwLjc4NDU0LC0yLjM3OTkxIC0yLjAxMzcyLC0xLjUwMzYgMi40NzM1MywwIHogbSAtNS42NzkzNCw1Ljg0NTI3IDAuNzUxMzUsLTIuMzIxMDQgMC43MzA0NSwyLjMyMTA0IDIuNDgyOTYsMCAtMS45OTg1NCwxLjUwMTc1IDAuNzcwMzQsMi4zODE4NSAtMS45ODUyMSwtMS40Njg0NiAtMS45OTM4NiwxLjQ2ODQ2IDAuNzgxNzIsLTIuMzgxODUgLTIuMDE4NDksLTEuNTAxNzUgMi40NzkyOCwwIHogbSAtNC41ODUxNSw3Ljg3NTUyIDIuNDczNTMsMCAwLjc0ODQ0LC0yLjMyMTA0IDAuNzMzMzYsMi4zMjEwNCAyLjQ4NDkxLDAgLTIuMDAyMzMsMS40OTk4MSAwLjc3ODksMi4zNzk5MSAtMS45OTQ4NCwtMS40NjM3IC0xLjk5MDk1LDEuNDYzNyAwLjc4NDY0LC0yLjM3OTkxIC0yLjAxNTY2LC0xLjQ5OTgxIHogbSA1LjMzNjUsMTAuNTMxMDMgLTEuOTkzODYsMS40NzEyOSAwLjc4MTcyLC0yLjM3OTkxIC0yLjAxODQ5LC0xLjUwMzY5IDIuNDc5MjgsMCAwLjc1MTM1LC0yLjMxOTEgMC43MzA0NSwyLjMxOTEgMi40ODI5NiwwIC0xLjk5ODU0LDEuNTAzNjkgMC43NzAzNCwyLjM3OTkxIC0xLjk4NTIxLC0xLjQ3MTI5IHogbSA3Ljc0OTEyLDcuMjM2NzYgLTEuOTkwOTUsLTEuNDY4NDggLTEuOTkwOTUsMS40Njg0OCAwLjc4NjUsLTIuMzgzNzEgLTIuMDE5NDcsLTEuNDk5OCAyLjQ3NDUsMCAwLjc0OTQyLC0yLjMyMjk4IDAuNzMzMjYsMi4zMjI5OCAyLjQ4MzA3LDAgLTIuMDAxNDYsMS40OTk4IDAuNzc2MDgsMi4zODM3MSB6IG0gNS4yMDE2MywtMzMuNjMxOTIgMC43NDk0MSwtMi40MTIyMiAwLjczMjM5LDIuNDEyMjIgMi40ODI5NywwIC0yLjAwMDQ5LDEuNTU5NzUgMC43Nzg5LDIuNDY5MjUgLTEuOTkzNzcsLTEuNTIwNzMgLTEuOTkzODYsMS41MjA3MyAwLjc4ODQ0LC0yLjQ2OTI1IC0yLjAxNzUyLC0xLjU1OTc1IDIuNDczNTMsMCB6IG0gMi44MzI1MiwzNS43MTcyNiAtMS45OTI4OSwtMS40NjU2NSAtMS45OTA5NSwxLjQ2NTY1IDAuNzgzNjYsLTIuMzc2MTIgLTIuMDE4NDgsLTEuNTA0NjYgMi40NzcyMiwwIDAuNzQ4NTUsLTIuMzIxOTIgMC43MzA1MywyLjMyMTkyIDIuNDg1NzksMCAtMi4wMDA0OSwxLjUwNDY2IDAuNzc3MDYsMi4zNzYxMiB6IG0gNy44Njk3OCwtMi4xMDcxNCAtMS45ODgxMywtMS40Njk0NCAtMS45OTY2OCwxLjQ2OTQ0IDAuNzg2NTksLTIuMzgxODYgLTIuMDE5NDcsLTEuNDk4OTMgMi40NzcyMywwIDAuNzUyMzMsLTIuMzIwOTMgMC43Mjk1NiwyLjMyMDkzIDIuNDg1NzksMCAtMi4wMDEzNSwxLjQ5ODkzIDAuNzc0MTMsMi4zODE4NiB6IG0gNS44NDM3MSwtNS43NjI2NCAtMS45OTU3MiwtMS40NzIyNyAtMS45ODYyOCwxLjQ3MjI3IDAuNzgzNjcsLTIuMzgwMDEgLTIuMDE5MzYsLTEuNTA1NDUgMi40NzI1NSwwIDAuNzQ5NDIsLTIuMzIxMDQgMC43MzUyLDIuMzIxMDQgMi40ODExMywwIC0xLjk5OTUyLDEuNTA1NDUgMC43Nzg5MSwyLjM4MDAxIHogbSAyLjE4OTQ2LC04LjEyMjYxIC0xLjk4OTA5LC0xLjQ2OTQ0IC0xLjk5MjgsMS40Njk0NCAwLjc4NDU1LC0yLjM4MTg2IC0yLjAxOTQ3LC0xLjUwMTc1IDIuNDcxNjgsMCAwLjc1NjA0LC0yLjMxNTI5IDAuNzMwNDMsMi4zMTUyOSAyLjQ4Nzg0LDAgLTIuMDAyMzQsMS41MDE3NSAwLjc3MzE2LDIuMzgxODYgeiIgLz48L3N2Zz4=';
/* CONSTANTS */
const CSV_URL = new URL('./EJM2026update.csv', document.baseURI).href;
const FIELD_COUNTRY   = 'Country';
const FIELD_METRIC    = 'Metric';
const FIELD_PERIOD    = 'Year';
const FIELD_LEVEL1_A  = 'Level 1';
const FIELD_LEVEL1_B  = 'Level 1 ';
const FIELD_CATEGORY  = 'Category';
const FIELD_CRITERION = 'Calc Type';
const FIELD_QUINTILE  = 'Quintile';
const FIELD_VALUE     = 'Value';
const QUINTILE_ORDER  = ['Low','Mid-low','Mid','Mid-high','High'];

const EU_ALIASES = new Set(["EU","EU27","EU-27","EU28","EU-28","European Union","European union","EU 27","EU 28"]);
const ISO2_TO_NAME = {
  "AT":"Austria","BE":"Belgium","BG":"Bulgaria","HR":"Croatia","CY":"Cyprus","CZ":"Czechia",
  "DK":"Denmark","EE":"Estonia","FI":"Finland","FR":"France","DE":"Germany","EL":"Greece","GR":"Greece",
  "HU":"Hungary","IE":"Ireland","IT":"Italy","LV":"Latvia","LT":"Lithuania","LU":"Luxembourg",
  "MT":"Malta","NL":"Netherlands","PL":"Poland","PT":"Portugal","RO":"Romania","SK":"Slovakia",
  "SI":"Slovenia","ES":"Spain","SE":"Sweden","IS":"Iceland","NO":"Norway","CH":"Switzerland",
  "AL":"Albania","ME":"Montenegro","MK":"North Macedonia","RS":"Serbia","TR":"Türkiye","XK":"Kosovo",
  "GB":"United Kingdom","UK":"United Kingdom"
};
const NAME_TO_ISO2 = Object.fromEntries(Object.entries(ISO2_TO_NAME).map(([k,v])=>[v,k]));

/* DOM */
const cSel       = document.getElementById('countrySel');
const yearPills  = document.getElementById('yearPills');
const filterWrap = document.getElementById('filterList');
const critWrap   = document.getElementById('critList');
const metricPills= document.getElementById('metricPills');

const tgWrap  = document.getElementById('chartToggles');
const btnBar  = document.getElementById('btnBar');
const btnRad  = document.getElementById('btnRadar');

/* STATE */
let rows = [];
let selCountryName = 'European Union';
let selPeriod = null, selFilterGroup = 'All', selCriterion, selMetric;
let selChart = 'bar'; // 'bar' | 'radar'
let chart;
const countryKeys = new Map();

/* HELPERS */
const lvl1 = r => (r[FIELD_LEVEL1_A] ?? r[FIELD_LEVEL1_B] ?? '').trim();
const uniq = a => [...new Set(a)];
const sortAlpha = a => a.slice().sort((x,y)=>x.localeCompare(y));

function displayPeriod(p){ const m=(p||'').match(/(\d{4})\D+(\d{4})/); return m ? `${m[1]} \u2013 ${m[2]}` : p; }
function startYear(p){ const m=(p||'').match(/(\d{4})/); return m?+m[1]:-Infinity; }
function endYear(p){ const m=(p||'').match(/(\d{4})\D+(\d{4})/); return m?+m[2]:startYear(p); }
function sortYearsDesc(list){ return list.slice().sort((a,b)=> (endYear(b)-endYear(a)) || (startYear(b)-startYear(a))); }
function datasetUsesCodes(){ const sample = rows[0]?.[FIELD_COUNTRY] || ''; return sample.length <= 3 || ISO2_TO_NAME[sample]; }
function toDisplayName(v){
  if (!v) return v;
  if (EU_ALIASES.has(v)) return 'European Union';
  if (v.length>2 && !ISO2_TO_NAME[v]) return v;
  return ISO2_TO_NAME[v] || v;
}
function toDatasetKey(name){ return name === 'European Union' ? 'EU_ANY' : (countryKeys.get(name) || name); }

/* Number formatting rules */
function fmtVal(v){
  const abs = Math.abs(v);
  
  // Millions formatting (e.g., 2.7M or 27M)
  if (abs >= 1_000_000){
    const m = abs / 1e6;
    const digits = m < 10 ? m.toFixed(1) : Math.round(m).toString();
    return (v<0?'-':'') + digits.replace(/\.0$/,'') + 'M';
  }
  
  // Tens of thousands formatting (Fixes the 265.5K -> 266K rounding issue)
  if (abs >= 10_000){
    return (v<0?'-':'') + Math.round(abs / 1e3) + 'K';
  }
  
  // Single thousands formatting (e.g., 1.5K or 9.5K)
  if (abs >= 1_000){
    return (v<0?'-':'') + (abs / 1e3).toFixed(1).replace(/\.0$/,'') + 'K';
  }
  
  // Under 1,000 formatting
  return (v<0?'-':'') + Math.round(abs).toString();
}
function formatTooltip3(v){
  const sign = v < 0 ? '-' : '';
  const abs  = Math.abs(v);
  if (abs >= 1_000_000) return sign + (abs/1e6).toFixed(3).replace(/\.?0+$/,'') + 'M';
  if (abs >= 1_000)     return sign + (abs/1e3).toFixed(1).replace(/\.0$/,'') + 'K';
  return sign + Math.round(abs).toString();
}

/* Export filenames */
function safeFile(s){ return s.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-').replace(/\s+/g, ' ').trim(); }
function exportName(kind){ const yr = displayPeriod(selPeriod); return safeFile(`EJM_${kind} ${selCountryName} ${selMetric} ${yr}`); }

/* Radar toggle visibility */
function updateToggleVisibility(){
  document.querySelectorAll('.pill').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
  const show = /^total employment$/i.test((selMetric || '').trim());
  tgWrap.classList.toggle('hidden', !show);
  if (!show && selChart === 'radar') selChart = 'bar';
  btnBar.classList.toggle('active', selChart === 'bar');
  btnRad.classList.toggle('active', selChart === 'radar');
  btnBar.setAttribute('aria-pressed', String(selChart === 'bar'));
  btnRad.setAttribute('aria-pressed', String(selChart === 'radar'));
}

/* EJM country choices keep their flag and name, with native keyboard controls. */
function nameToFlagCode(name) {
  if (name === 'European Union') return 'eu';
  const code = NAME_TO_ISO2[name] || '';
  return ({EL:'GR', UK:'GB'}[code] || code).toLowerCase();
}
function buildFlagCountryDropdown(countries) {
  const ui = document.getElementById('countryUI');
  ui.innerHTML = '<button type="button" class="ef-select btn" id="flagBtn" aria-expanded="false" aria-controls="flagList"><span id="labelCurr"></span><svg aria-hidden="true" viewBox="0 0 16 16"><path d="m3 5 5 5 5-5z"/></svg></button><div class="ef-popover list" id="flagList" hidden></div>';
  const btn = ui.querySelector('#flagBtn'), list = ui.querySelector('#flagList');
  function label(name) {
    const fragment = document.createDocumentFragment(), code = nameToFlagCode(name);
    if (code) {
      const flag = document.createElement('img');
      flag.className = 'country-flag'; flag.alt = ''; flag.setAttribute('aria-hidden', 'true');
      flag.width = 24; flag.height = 18;
      flag.src = new URL(`../assets/flags/4-3/${code}.svg`, document.baseURI).href;
      flag.onerror = () => { flag.hidden = true; };
      fragment.append(flag);
    }
    const text = document.createElement('span'); text.textContent = name; fragment.append(text);
    return fragment;
  }
  function select(name) {
    const current = ui.querySelector('#labelCurr');
    current.replaceChildren(label(name));
    current.style.cssText = 'display:flex;align-items:center;gap:.6rem;';
    list.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.name === name)));
  }
  function close(focus = false) { list.hidden = true; btn.setAttribute('aria-expanded','false'); if (focus) btn.focus(); }
  countries.forEach(name => {
    const item = document.createElement('button'); item.type = 'button'; item.className = 'item'; item.dataset.name = name;
    item.append(label(name)); item.onclick = () => { cSel.value = name; select(name); close(true); cSel.onchange(); };
    list.append(item);
  });
  select(selCountryName);
  btn.onclick = () => { const opening = list.hidden; list.hidden = !opening; btn.setAttribute('aria-expanded', String(opening)); };
  ui.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault(); list.hidden = false; btn.setAttribute('aria-expanded','true');
      const items = [...list.children], current = items.indexOf(document.activeElement);
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 :
        current < 0 ? (event.key === 'ArrowDown' ? 0 : items.length - 1) :
        (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[index]?.focus();
    }
  });
  document.addEventListener('click', event => { if (!ui.contains(event.target)) close(); });
  document.addEventListener('focusin', event => { if (!ui.contains(event.target)) close(); });
}

/* UI */
function initUI(){
  // Countries (EU first, UK removed)
  const allNames = uniq(rows.map(r => toDisplayName(r[FIELD_COUNTRY]))).filter(n=>n && n!=='United Kingdom');
  const countries = [
    ...(allNames.includes('European Union') ? ['European Union'] : []),
    ...sortAlpha(allNames.filter(n=>n!=='European Union'))
  ];
  // hidden select to keep rest of code working
  cSel.innerHTML = countries.map(n=>`<option>${n}</option>`).join('');
  selCountryName = countries[0] || 'European Union';
  cSel.value = selCountryName;
  cSel.onchange = ()=>{ selCountryName=cSel.value; buildYears(true); draw(); };
  // visible flag dropdown
  buildFlagCountryDropdown(countries);

  // Metric buttons
  const metrics = sortAlpha(uniq(rows.map(r=>r[FIELD_METRIC]))).filter(Boolean);
  metricPills.innerHTML = metrics.map((m,i)=>`<button class="ef-chip pill ${i===0?'active':''}" data-v="${m}">${m}</button>`).join('');
  selMetric = metrics[0];
  metricPills.onclick = e=>{
    const v=e.target?.dataset?.v; if(!v) return;
    selMetric=v;
    metricPills.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.v===selMetric));
    updateToggleVisibility();
    buildYears(true); draw();
  };

  // Criterion (ordered)
  const critOrder=['Job-wage','Education','Broad job quality'];
  const critsAvail=uniq(rows.map(r=>r[FIELD_CRITERION])).filter(Boolean);
  const crits=critOrder.filter(c=>critsAvail.includes(c));
  critWrap.innerHTML = crits.map((c,i)=>`<label><input type="radio" name="crit" value="${c}" ${i===0?'checked':''}>${c}</label>`).join('');
  selCriterion=crits[0];
  critWrap.onchange = e=>{ selCriterion=e.target.value; buildYears(true); draw(); };

  // Filter-by (ordered, single All)
  const order=['All','Age','Sector','Gender','Contractual status','Employment status','Working hours','Core/non-core'];
  const avail=uniq(rows.map(r=>lvl1(r))).filter(Boolean);
  const groups=order.filter(f=>f==='All'||avail.includes(f));
  filterWrap.innerHTML = groups.map((g,i)=>`<label><input type="radio" name="f" value="${g}" ${i===0?'checked':''}>${g}</label>`).join('');
  selFilterGroup=groups[0]||'All';
  filterWrap.onchange = e=>{ selFilterGroup=e.target.value; draw(); };

  // Years
  buildYears(false);

  // Radar toggle initial visibility
  updateToggleVisibility();

  // Toggle handlers
  btnBar.onclick = ()=>{ selChart='bar';   btnBar.classList.add('active');   btnRad.classList.remove('active'); draw(); };
  btnRad.onclick = ()=>{ selChart='radar'; btnRad.classList.add('active'); btnBar.classList.remove('active');   draw(); };
}

function buildYears(preserve){
  const key = toDatasetKey(selCountryName);
  const yearsRaw = uniq(
    rows.filter(r=>{
      const ok = key==='EU_ANY' ? EU_ALIASES.has(r[FIELD_COUNTRY]) : r[FIELD_COUNTRY]===key;
      return ok && r[FIELD_METRIC]===selMetric && r[FIELD_CRITERION]===selCriterion;
    }).map(r=>r[FIELD_PERIOD])
  );
  const years = sortYearsDesc(yearsRaw);
  if (!(preserve && selPeriod && years.includes(selPeriod))) selPeriod = years[0] || null;

  yearPills.innerHTML = years.map(y=>`<button class="ef-chip pill ${y===selPeriod?'active':''}" data-v="${y}">${displayPeriod(y)}</button>`).join('');
  yearPills.onclick = e=>{
    const v=e.target?.dataset?.v; if(!v) return;
    selPeriod=v;
    yearPills.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.v===selPeriod));
    draw();
  };
}


const SOURCE = 'Eurofound, European Jobs Monitor';
const CORE_NOTE = '“core” workers are full time dependent employees with a permanent contract whilst non-core are any combination of part-time, self-employed or temporary workers.';
const EXPORTS = ['png', 'csv'];
const isEmbedded = window.parent !== window;
let ready = false, themeFromHost = false, lastHeight = 0;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const animationOptions = () => reducedMotion.matches ? false : {duration:650};
let chartMode = null;

function placeWatermark(target) {
  // Original fitted watermark × 1.2, with a softer opacity. Embed the SVG so
  // the same artwork is available in a self-contained image export.
  const aspect = 1, fit = 1.02;
  let width = target.plotWidth * fit, height = width * aspect;
  if(height > target.plotHeight * fit) { height = target.plotHeight * fit; width = height / aspect; }
  const box = {x:target.plotLeft+(target.plotWidth-width)/2, y:target.plotTop+(target.plotHeight-height)/2, width, height};
  if(!target.ejmWatermark) target.ejmWatermark = target.renderer.image(WATERMARK_URL,0,0,1,1)
    .attr({zIndex:0,opacity:.045,'aria-hidden':true}).css({pointerEvents:'none'}).add();
  target.ejmWatermark.attr(box);
}

function readTokens(element = document.documentElement) {
  const css = getComputedStyle(element), v = name => css.getPropertyValue(name).trim();
  return {
    dark:css.colorScheme === 'dark',
    series: Array.from({length:5}, (_,i) => v(`--chart-${i+1}`)),
    background:v('--background'), surface:v('--surface'), text:v('--foreground'), heading:v('--heading'),
    muted:v('--muted-foreground'), border:v('--border'), context:v('--border-strong'), axis:v('--chart-axis'),
    grid:v('--chart-grid'), label:v('--chart-label'), onData:v('--chart-label-on-data'),
    positive:v('--ejm-positive'), negative:v('--ejm-negative'),
    fontText:v('--font-source-sans-3'), fontHeading:v('--font-roboto')
  };
}

function currentView(preserveVisibility = false) {
  const key = toDatasetKey(selCountryName);
  const data = rows.filter(r => (key === 'EU_ANY' ? EU_ALIASES.has(r[FIELD_COUNTRY]) : r[FIELD_COUNTRY] === key) &&
    r[FIELD_METRIC] === selMetric && r[FIELD_CRITERION] === selCriterion && r[FIELD_PERIOD] === selPeriod);
  const isAll = selFilterGroup === 'All';
  const categories = isAll ? ['All'] : sortAlpha(uniq(data.filter(r => lvl1(r) === selFilterGroup).map(r => r[FIELD_CATEGORY])));
  const hidden = new Set(preserveVisibility ? chart?.series.filter(s => !s.visible).map(s => s.name) : []);
  const series = categories.map((cat, index) => ({
    name:cat, colorIndex:index, visible:!hidden.has(cat),
    data:QUINTILE_ORDER.map(q => {
      const row = data.find(r => (isAll ? lvl1(r).toLowerCase() === 'all' && (r[FIELD_CATEGORY] || '').trim().toLowerCase() === 'all' :
        lvl1(r) === selFilterGroup && r[FIELD_CATEGORY] === cat) && r[FIELD_QUINTILE] === q);
      // A missing observation remains missing; a published zero remains zero.
      return row && row[FIELD_VALUE].trim() !== '' && Number.isFinite(+row[FIELD_VALUE]) ? +row[FIELD_VALUE] : null;
    })
  }));
  return {
    country:selCountryName, period:selPeriod, periodLabel:displayPeriod(selPeriod), metric:selMetric,
    criterion:selCriterion, filter:selFilterGroup,
    mode:selMetric === 'Total employment' && selChart === 'radar' ? 'radar' : 'bar', series,
    title:`${selMetric} by ${selCriterion.toLowerCase()} quintile in ${selCountryName} (${displayPeriod(selPeriod)})`,
    notes:selFilterGroup === 'Core/non-core' ? CORE_NOTE : ''
  };
}

function chartOptions(view, t, exporting = false) {
  const motion = exporting ? false : animationOptions();
  const insideMinH = 19, insideMinW = 31;
  const inside = {color:t.onData, fontSize:'.857142857rem', fontWeight:400, textOutline:'none'};
  const outside = {...inside, color:t.label};
  const labels = [
    {enabled:true, inside:true, verticalAlign:'top', align:'center', y:4, padding:0, crop:true, overflow:'none', allowOverlap:false,
      style:inside, formatter(){ const sh=this.point?.shapeArgs; if(this.series.chart.series.length>2||!sh||this.y<=0||sh.width<insideMinW||Math.abs(sh.height)<insideMinH)return ''; return fmtVal(this.y); }},
    {enabled:true, inside:true, verticalAlign:'bottom', align:'center', y:-4, padding:0, crop:true, overflow:'none', allowOverlap:false,
      style:inside, formatter(){ const sh=this.point?.shapeArgs; if(this.series.chart.series.length>2||!sh||this.y>=0||sh.width<insideMinW||Math.abs(sh.height)<insideMinH)return ''; return fmtVal(this.y); }},
    {enabled:true, inside:false, align:'center', verticalAlign:'bottom', y:-2, crop:false, overflow:'none', allowOverlap:false,
      style:outside, formatter(){ const sh=this.point?.shapeArgs; if(!sh||this.y<=0)return ''; if(this.series.chart.series.length<=2&&sh.width>=insideMinW&&Math.abs(sh.height)>=insideMinH)return ''; return fmtVal(this.y); }},
    {enabled:true, inside:false, align:'center', verticalAlign:'top', y:12, crop:false, overflow:'none', allowOverlap:false,
      style:outside, formatter(){ const sh=this.point?.shapeArgs; if(!sh||this.y>=0)return ''; if(this.series.chart.series.length<=2&&sh.width>=insideMinW&&Math.abs(sh.height)>=insideMinH)return ''; return fmtVal(this.y); }}
  ];
  const radar = view.mode === 'radar';
  const options = {
    colors:t.series,
    chart:{type:radar ? 'line' : 'column', polar:radar, height:exporting ? 730 : null, events:{render(){placeWatermark(this);}},
      backgroundColor:exporting ? t.background : 'transparent', spacingBottom:20, animation:motion,
      style:{fontFamily:t.fontText, fontSize:'1rem'}},
    title:{text:escapeHTML(view.title), style:{color:t.heading, fontFamily:t.fontHeading, fontSize:'1.285714286rem', fontWeight:'700'}},
    credits:{enabled:false}, exporting:{enabled:false, local:true, fallbackToExportServer:false},
    accessibility:{enabled:!exporting, description:`${view.title}. Filter: ${view.filter}. Values are numbers of jobs.`},
    xAxis:{categories:QUINTILE_ORDER, title:radar ? null : {text:'Quintile', style:{color:t.label,fontSize:'.985714286rem'}},
      lineColor:t.axis, lineWidth:radar ? 0 : .8, tickLength:0,
      labels:{style:{color:t.label,fontSize:'.985714286rem',fontWeight:400}},
      ...(radar ? {tickmarkPlacement:'on'} : {})},
    yAxis:{title:{text:view.metric, style:{color:t.label,fontSize:'.985714286rem'}},
      gridLineColor:t.grid, gridLineWidth:1,
      labels:{style:{color:t.muted,fontSize:'.985714286rem',fontWeight:400},formatter(){return fmtVal(this.value);}},
      ...(radar ? {gridLineInterpolation:'polygon',lineWidth:0,min:0} : {})},
    legend:{align:'center',verticalAlign:'top',layout:'horizontal',symbolRadius:2,
      itemStyle:{color:t.text,fontSize:'1.028571428rem',fontWeight:400},itemHoverStyle:{color:t.heading},itemHiddenStyle:{color:t.muted}},
    tooltip:{useHTML:true, shared:radar, backgroundColor:t.surface, borderColor:t.border,
      style:{color:t.text,fontSize:'.96rem',pointerEvents:'auto'},
      formatter(){
        // Preserve the original EJM tooltip content and layout.
        if (radar) {
          const pts = this.points || [this.point];
          const lines = pts.map(p => `<span style="color:${p.series.color}">●</span> ${escapeHTML(p.series.name)}: <b style="color:${p.y >= 0 ? t.positive : t.negative}">${formatTooltip3(p.y)}</b>`);
          return `<div style="padding:6px 8px"><b>${escapeHTML(view.country)}</b><br>${lines.join('<br>')}<br>${escapeHTML(this.key ?? this.x)} quintile</div>`;
        }
        const lines = [`<div style="text-align:center"><b>${escapeHTML(view.country)}</b></div>`,
          `${escapeHTML(view.metric)}: <b style="color:${this.y >= 0 ? t.positive : t.negative}">${formatTooltip3(this.y)}</b> jobs`];
        if(view.filter !== 'All') lines.push(`${escapeHTML(view.filter)}: <b>${escapeHTML(this.series.name)}</b>`);
        lines.push(`${escapeHTML(this.key)} quintile`);
        return `<div style="padding:6px 8px">${lines.join('<br>')}</div>`;
      }},
    plotOptions:{series:{animation:motion, borderColor:t.dark ? t.label : t.background, borderWidth:1, states:{inactive:{opacity:.2}}}},
    series:view.series.map(s => ({id:JSON.stringify([view.filter,s.name]),name:s.name, color:t.series[s.colorIndex % t.series.length], data:s.data.slice(), visible:s.visible,
      ...(radar ? {pointPlacement:'on',marker:{enabled:true,radius:3},dataLabels:{enabled:false}} : {dataLabels:labels})}))
  };
  if(radar) options.pane = {size:'80%'};
  return options;
}

function footnotes(view) { return [['Source',SOURCE],['Notes',view.notes]].filter(([,value]) => value); }
function updateNotes(view) {
  const p = document.createElement('p');
  footnotes(view).forEach(([key,value],index) => {
    const span = document.createElement('span'), bold = document.createElement('strong');
    span.className = 'footnote-segment'; bold.textContent = key + ': ';
    span.append(bold, document.createTextNode(value));
    if(index) p.append(document.createTextNode(' ')); p.append(span);
  });
  document.getElementById('viewNotes').replaceChildren(p);
}
function showStatus(message, danger = false) {
  const status = document.getElementById('status'); status.textContent = message;
  status.className = danger ? 'ef-notice ef-notice--danger' : 'ef-notice';
}
function draw(preserveVisibility = false, rebuild = false) {
  updateToggleVisibility();
  const view = currentView(preserveVisibility);
  updateNotes(view);
  if(!selPeriod || !view.series.some(s => s.data.some(Number.isFinite))) {
    chart?.destroy(); chart = null; chartMode = null;
    document.getElementById('container').replaceChildren();
    showStatus('No data for this selection. Choose another country, year or filter.');
  } else {
    showStatus('');
    const options = chartOptions(view,readTokens());
    if(!chart || rebuild || chartMode !== view.mode) {
      chart?.destroy();
      chart = Highcharts.chart('container',options); chartMode = view.mode;
    } else {
      const motion = animationOptions(), wanted = new Set(options.series.map(s => s.id));
      chart.tooltip.hide(0);
      chart.update({title:options.title,tooltip:options.tooltip,accessibility:options.accessibility},false,false,false);
      chart.yAxis[0].setTitle(options.yAxis.title,false);
      // Match subgroup identities and fixed quintile positions. Existing points
      // keep their SVG graphics, so setData animates from their current heights.
      chart.series.slice().forEach(s => { if(!wanted.has(s.options.id))s.remove(false); });
      options.series.forEach(next => {
        const existing = chart.series.find(s => s.options.id === next.id);
        if(existing) {
          if(existing.visible !== next.visible)existing.setVisible(next.visible,false);
          existing.setData(next.data,false,motion,true);
        } else chart.addSeries(next,false,motion);
      });
      chart.redraw(motion);
    }
    if(!ready) { ready = true; announce(); }
  }
  document.getElementById('container').setAttribute('aria-busy','false');
  postHeight(true);
}

function toHost(message) { if(isEmbedded) window.parent.postMessage({source:'ef-embed',...message},'*'); }
function announce() { toHost({type:'ready',exports:EXPORTS,languages:EF_LANGUAGES}); }
function postHeight(force = false) {
  const height = Math.ceil(document.body.getBoundingClientRect().height);
  if(force || height !== lastHeight) { lastHeight = height; toHost({type:'resize',height}); }
}
function setTheme(theme) {
  if(!['light','dark'].includes(theme) || document.documentElement.dataset.theme === theme)return;
  document.documentElement.dataset.theme = theme;
  if(ready) draw(true,true);
}
new ResizeObserver(() => requestAnimationFrame(() => postHeight())).observe(document.body);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const fromUrl = new URLSearchParams(location.search).get('theme');
  if(!['light','dark'].includes(fromUrl) && !themeFromHost)setTheme(event.matches ? 'dark' : 'light');
});
reducedMotion.addEventListener('change', () => { if(ready)draw(true,true); });

function exportFilename(view, extension) {
  return safeFile(`EJM ${view.country} ${view.metric} ${view.criterion} ${view.filter} ${view.periodLabel}`) + '.' + extension;
}
async function buildExport(format) {
  if(!ready)throw new Error('Data is still loading');
  if(!EXPORTS.includes(format))throw new Error(`No ${format} export`);
  const view = currentView(true);
  if(!view.series.some(s => s.visible && s.data.some(Number.isFinite)))throw new Error('Nothing to export in the current view');
  if(format === 'csv') {
    const metadata = [['Title',view.title],['Country',view.country],['Period',view.periodLabel],
      ['Metric',view.metric],['Job quality criterion',view.criterion],['Filter',view.filter],['View',view.mode],
      ['Unit','Jobs'],['Source',SOURCE],...(view.notes ? [['Notes',view.notes]] : []),['Exported at',new Date().toISOString()]];
    const records = view.series.filter(s => s.visible).flatMap(s => s.data.map((value,index) =>
      [view.country,view.periodLabel,view.metric,view.criterion,view.filter,s.name,QUINTILE_ORDER[index],Number.isFinite(value) ? value : '']));
    const csv = Papa.unparse([...metadata,[],['Country','Period','Metric','Job quality criterion','Filter','Category','Quintile','Value (jobs)'],...records],
      {newline:'\r\n',escapeFormulae:true});
    return {blob:new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'}),filename:exportFilename(view,'csv'),mimeType:'text/csv'};
  }
  // An independent light-themed chart keeps the visible selection and theme intact.
  await document.fonts.ready;
  const probe = document.createElement('div'); probe.dataset.theme = 'light'; probe.hidden = true;
  document.body.append(probe); const light = readTokens(probe); probe.remove();
  const holder = document.createElement('div'); holder.dataset.theme = 'light'; holder.setAttribute('aria-hidden','true');
  holder.style.cssText = 'position:fixed;left:-20000px;top:0;width:1200px;visibility:hidden;'; document.body.append(holder);
  let exportChart, objectURL;
  try {
    const options = chartOptions(view,light,true); options.chart.width = 1200;
    exportChart = Highcharts.chart(holder,options);
    objectURL = URL.createObjectURL(new Blob([exportChart.getSVG()],{type:'image/svg+xml;charset=utf-8'}));
    const image = new Image();
    await new Promise((resolve,reject) => {image.onload=resolve;image.onerror=()=>reject(new Error('Could not render the image export'));image.src=objectURL;});
    const canvas = document.createElement('canvas'); canvas.width = 1200;
    const context = canvas.getContext('2d'), font=`18.4px ${light.fontText}`, boldFont=`600 18.4px ${light.fontText}`;
    const padding=24, logoWidth=75, logoLeft=canvas.width-padding-logoWidth, noteWidth=logoLeft-padding-24;
    const lines=[[]]; let lineWidth=0;
    footnotes(view).forEach(([key,value],index) => {
      const runs=[{text:`${key}: `,bold:true},...value.split(/\s+/).map(word=>({text:word+' ',bold:false}))];
      if(index && lineWidth)lineWidth+=16;
      for(const run of runs) {
        context.font=run.bold?boldFont:font; const width=context.measureText(run.text).width;
        if(lineWidth && lineWidth+width>noteWidth){lines.push([]);lineWidth=0;}
        lines.at(-1).push({...run,x:lineWidth});lineWidth+=width;
      }
    });
    const logo=new Image();
    await new Promise((resolve,reject)=>{logo.onload=resolve;logo.onerror=()=>reject(new Error('Could not load the Eurofound export logo'));logo.src=new URL('./eurofound-logo.svg',document.baseURI).href;});
    const logoHeight=logoWidth*logo.naturalHeight/logo.naturalWidth;
    const footerTop=options.chart.height+12, footerHeight=Math.max(lines.length*26.45,logoHeight);
    canvas.height=Math.ceil(footerTop+footerHeight+padding);
    context.fillStyle=light.background;context.fillRect(0,0,canvas.width,canvas.height);
    context.drawImage(image,0,0);context.fillStyle=light.text;
    lines.forEach((line,index)=>line.forEach(run=>{context.font=run.bold?boldFont:font;context.fillText(run.text,24+run.x,options.chart.height+28+index*26.45);}));
    context.drawImage(logo,logoLeft,footerTop+footerHeight-logoHeight,logoWidth,logoHeight);
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(result=>result?resolve(result):reject(new Error('Could not build the PNG')),'image/png'));
    return {blob,filename:exportFilename(view,'png'),mimeType:'image/png'};
  } finally {if(objectURL)URL.revokeObjectURL(objectURL);exportChart?.destroy();holder.remove();}
}

window.addEventListener('message',async event => {
  if(event.source !== window.parent || !event.data)return;
  // Retain compatibility with the existing website card's download buttons.
  if(event.data === 'download-png' || event.data === 'download-csv') {
    let objectURL;
    try {
      const file=await buildExport(event.data.slice('download-'.length));objectURL=URL.createObjectURL(file.blob);
      const link=document.createElement('a');link.href=objectURL;link.download=file.filename;link.hidden=true;
      document.body.append(link);link.click();link.remove();
    } catch(error){showStatus(error.message,true);}
    finally {if(objectURL)setTimeout(()=>URL.revokeObjectURL(objectURL),1000);}
    return;
  }
  if(typeof event.data !== 'object')return;
  const data=event.data;
  if(data.type === 'set-theme' && ['light','dark'].includes(data.theme)){themeFromHost=true;setTheme(data.theme);}
  else if(data.type === 'hello'){if(ready)announce();postHeight(true);}
  else if(data.type === 'export') {
    const reply=message=>event.source.postMessage({source:'ef-embed',id:data.id,format:data.format,...message},event.origin==='null'?'*':event.origin);
    try {reply({type:'export-result',...await buildExport(data.format)});}
    catch(error){reply({type:'export-error',message:error.message});}
  }
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')chart?.tooltip?.hide(0);});
document.getElementById('retry').onclick=()=>location.reload();
function fail(message) {
  showStatus(message,true);document.getElementById('retry').hidden=false;
  document.getElementById('container').setAttribute('aria-busy','false');postHeight(true);
}
if(typeof Highcharts === 'undefined' || typeof Papa === 'undefined' || !Highcharts.Chart.prototype.getSVG) {
  fail('The dashboard could not load its chart libraries. Check your connection and try again.');
} else {
  Highcharts.setOptions({lang:{decimalPoint:'.',thousandsSep:','}});
  Papa.parse(CSV_URL,{
    download:true,header:true,dynamicTyping:false,skipEmptyLines:true,
    error:()=>fail('The EJM data could not be loaded. Check your connection and try again.'),
    complete:({data,errors})=>{
      try {
        if(errors.length)throw new Error('Invalid CSV');
        rows=data.filter(r=>r && r[FIELD_COUNTRY]);
        if(!rows.length || ![FIELD_COUNTRY,FIELD_METRIC,FIELD_PERIOD,FIELD_CATEGORY,FIELD_CRITERION,FIELD_QUINTILE,FIELD_VALUE].every(key=>key in rows[0]))throw new Error('Invalid columns');
        rows.forEach(r=>countryKeys.set(toDisplayName(r[FIELD_COUNTRY]),r[FIELD_COUNTRY]));
        document.getElementById('controls').hidden=false;initUI();draw();
      } catch(error){console.error(error);fail('The EJM data could not be displayed. Please try again later.');}
    }
  });
}
