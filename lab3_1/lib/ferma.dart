import 'dart:math';

ferma(int n) {
  if (n < 0) return 'must be > 0';
  if (n % 2 == 0) return 'is not odd';
  int x = sqrt(n).toInt();
  int y = 0;
  while (true) {
    int r = (x * x) - n;
    if (r > 0) {
      y = sqrt(r).toInt();
    }
    if ((y * y) == r) {
      int a = x - y;
      int b = x + y;
      return '$a * $b = $n';
    }
    x++;
  }
}
