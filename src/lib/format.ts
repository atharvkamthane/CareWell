export function initials(name: string) { return name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase(); }
export function formatCount(value: number) { return new Intl.NumberFormat('en-IN').format(value); }
export function titleCase(value: string) { return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value; }
