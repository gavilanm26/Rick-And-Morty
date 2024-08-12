// character.entity.ts

export class Character {
  constructor(
    public readonly name: string,
    public readonly status: string,
    public readonly species: string,
    public readonly type: string,
    public readonly gender: string,
    public readonly origin: { nameO: string; url: string },
    public readonly location: { nameL: string; url: string },
    public readonly image: string,
    public readonly episode: string[],
    public readonly url: string,
    public readonly created: Date,
  ) {}
}
