# PhotoShopで複数のテキストレイヤーから一括でコピー
詳細はこちら
https://www.soramane.com/sorairo/design/20181031-active-text-copy/

※このファイルは、soramaneが作成されたscriptをもとにimworksが改変を行ったものです。

## 改変内容
### var br = false; // trueにすると改行が改行コードに変換される
#### trueの場合
123
<br>456
<br><br>
上記のようなテキストを選択して
scriptを実行すると「123<br>456」となる

#### falseの場合
scriptを実行すると「123456」となる

### var descending = true; // true: 上から順に処理、false: 下から順に処理
なんとなく加えてみた。

### 複数のテキストレイヤー対応
