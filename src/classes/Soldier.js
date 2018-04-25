class Soldier {
  constructor(color, x, y, isKing = false){
    this.color = color;
    this.x = x;
    this.y = y;
    this.isKing = isKing;

    this.id = `${x}_${y}`;
  }

  static find(x, y, soldiers){
    let soldier = soldiers.filter((item) => {
      return item.x === x && item.y === y;
    });

    return soldier[0] || null;
  }
}

export default Soldier;
