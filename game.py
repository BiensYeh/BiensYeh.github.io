import random

class Word:

  def __init__(self, fr, en):
    self.fr = fr
    self.en = en

  def __str__(self):
    return '{0} {1}'.format(self.fr, self.en)

def upfirst(s):
  return s[0].upper() + s[1:]

def read_words():
  f = open('words', 'r')
  lines = [line.strip() for line in f.readlines()]
  f.close()
  words = [ ]
  for line in lines:
    data = line.split(' ')
    fr = upfirst(data[0])
    en = upfirst(data[1])
    words.append(Word(fr, en))
  return words

def get_pos(i):
  return (i / 5, i % 5)

def make_word_matrix(words):
  indexes = set()
  while len(indexes) < 25:
    indexes.add(random.randint(0, len(words) - 1))
  print(indexes)
  M = [ [ ''  for j in range(5) ] for i in range(5) ]
  k = 0
  for i in indexes:
    x, y = get_pos(k)
    k += 1
    M[x][y] = words[i]
  return M

def make_secret_matrix():
  M = [ [ '.' for j in range(5) ] for i in range(5) ]
  blue = set()
  red = set()
  while len(blue) < 8:
    i = random.randint(0, 24)
    blue.add(i)
  while len(red) < 7:
    i = random.randint(0, 24)
    if not i in blue:
      red.add(i)
  i = random.randint(0, 24)
  while i in blue or i in red:
    i = random.randint(0, 24)
  black = i
  for i in blue:
    x, y = get_pos(i)
    M[x][y] = 'B'
  for i in red:
    x, y = get_pos(i)
    M[x][y] = 'R'
  x, y = get_pos(black)
  M[x][y] = 'X'
  return M

js = 'words = ['
words = read_words()
i = 0
for w in words:
  js += '"{0}"'.format(w.fr)
  if i < len(words) - 1:
    js += ','
  i += 1
js += '];\n'
f = open('words.js', 'w')
f.write(js)
f.close()

"""
s = ''
secret = make_secret_matrix()
for i in range(5):
  for j in range(5):
    s += secret[i][j][0]
  s += '\n'

print(s)

matrix = make_word_matrix(words)
s = ''
for i in range(5):
  for j in range(5):
    s += str(matrix[i][j]) + '\t'
  s += '\n'
print(s)
"""
