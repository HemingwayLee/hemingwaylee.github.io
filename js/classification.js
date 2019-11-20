const kerasLstm = {
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Classfication sample code\n",
    "The goal is checking an input sentence is from sports news or financial news articles\n",
    "\n",
    "# Prepare data"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "['東海大', '・', '海野', '隆司', '捕手', 'は', '左', '越え', '本塁打', 'を', '放っ', 'た', '。', '\\n']\n",
      "14\n",
      "['消費', '税', 'の', '税率', 'が', '１０月', '１', '日', 'に', '８', '％', 'から', '１', '０', '％', 'へ', '引き上げ', 'られる', '。', '\\n']\n",
      "20\n",
      "['春季', 'リーグ', '戦', 'の', 'MVP', 'は', '元気', 'いっぱい', 'だ', '。', '九', '産', '大', 'の', '武', '上', 'が', '4', '打数', '3', '安打', '3', '打点', 'と', '気', 'を', '吐い', 'た', '。', '\\n']\n",
      "30\n",
      "['中国', '側', 'も', '同', '時刻', 'に', '報復', 'として', '、', '米国', 'から', 'の', '輸入', '品', '７', '５', '０', '億', 'ドル', '分', 'の', '３', '３', '％', 'を', '占める', '１', '７', '１', '７', '品目', 'に', '５', '％', 'の', '追加', '関税', 'を', 'かけ', 'た', '。', '\\n']\n",
      "42\n",
      "['福岡', '六', '大学', '野球', '秋季', 'リーグ', '戦', '（', '西日本新聞社', '後援', '）', 'は', '31', '日', '、', '福岡', '市', 'の', '福', '工大', '野球', '場', 'で', '開幕', '戦', '3', '試合', 'が', '行わ', 'れ', 'た', '。', '\\n']\n",
      "33\n",
      "['春季', 'リーグ', '戦', 'は', 'チーム', '最多', 'の', '4', '勝', 'を', '挙げ', 'ながら', '、', '最長', 'イニング', 'は', '6', '回', '1', '/', '3', '。', '\\n']\n",
      "23\n",
      "['世界', '経済', 'の', '減速', 'が', '意識', 'さ', 'れる', 'なか', '、', '米', '中', 'の', '制裁', '関税', 'の', '応酬', 'は', '一段と', '拡大', 'し', 'た', '。', '\\n']\n",
      "24\n",
      "['増税', 'は', '５', '年', 'ぶり', 'で', '、', '軽減', '税率', 'など', '新', '制度', 'も', '導入', 'さ', 'れる', '。', '\\n']\n",
      "18\n",
      "['ヤクルト', '・', '青木', '宣', '親', '外野', '手', '（', '３', '７', '）', 'が', '通算', '１', '０', '０', '死球', 'を', '記録', 'し', 'た', '。', 'プロ', '野球', '２', '２', '人', '目', '。', '\\n']\n",
      "30\n",
      "['景勝', '地', '・', '鳥取砂丘', 'で', '、', '長年', '利', '活用', 'さ', 'れ', 'て', 'い', 'なかっ', 'た', '西側', 'の', '市有', '地', 'に', '高級', 'リゾート', 'ホテル', 'を', '誘致', 'する', '計画', 'が', '進ん', 'で', 'いる', '。', '\\n']\n",
      "33\n",
      "['中国', '政府', 'も', '同', '時刻', '、', '750', '億', 'ドル', '規模', 'の', '米国', '製品', 'に', '5', '％', 'か', '10', '％', 'の', '追加', '関税', 'を', '課す', '報復', '措置', 'の', '一部', 'を', '実行', 'に', '移し', 'た', '。', '\\n']\n",
      "35\n",
      "['ヤクルト', '・', '山田', '哲人', '内野', '手', '（', '２', '７', '）', 'が', '開幕', 'から', '３', '２', '連続', '盗塁', '成功', '。', '\\n']\n",
      "20\n",
      "['１０月', '１', '日', 'の', '消費', '税', '１', '０', '％', '引き上げ', 'まで', '１', 'カ月', '。', '\\n']\n",
      "15\n",
      "['５', '回', '２', '死', '一', '、', '二塁', 'から', '左', '前', '安打', 'で', '出塁', '。', '\\n']\n",
      "15\n",
      "['国民', '生活', 'センター', 'に', 'よる', 'と', '、', '全国', 'の', '消費', '生活', 'センター', 'に', '寄せ', 'られ', 'た', '、', '2018', '年度', 'の', '新聞', '販売', 'トラブル', 'の', '相談', 'は', '8783', '件', '。', '\\n']\n",
      "30\n",
      "['フランス', 'の', 'マクロン', '大統領', 'は', '8', '月', '31', '日', '、', 'イラン', 'の', 'ロウハニ', '大統領', 'と', '電話', '会談', 'し', 'た', '。', '\\n']\n",
      "21\n",
      "['１', '点', 'リード', 'の', '五', '回', '。', '先頭', 'で', '打席', 'に', '立ち', '、', '３', '球', '目', 'の', 'ファウル', 'が', '左足', 'を', '直撃', 'し', 'た', '。', '\\n']\n",
      "26\n",
      "['アメリカ', 'は', '昨年', '、', '2015', '年', 'に', '成立', 'し', 'た', 'イラン', '核', '合意', 'を', '離脱', 'し', '、', '経済', '制裁', 'を', '再開', '。', '\\n']\n",
      "23\n",
      "['ヤクルト', '青木', '宣', '親', '外野', '手', 'が', '、', '初回', 'の', '第', '1', '打席', 'に', '通算', '100', '個', '目', 'と', 'なる', '死球', 'を', '受け', 'た', '。', '\\n']\n",
      "26\n",
      "['無死', '一塁', '、', 'フルカウント', 'から', '中日', '先発', '大野', '雄', 'の', '6', '球', '目', '144', 'キロ', '直球', 'が', '右', '手首', '付近', 'を', '直撃', 'し', 'た', '。', '\\n']\n",
      "26\n",
      "['イラン', '核', '合意', 'に', '締結', 'し', 'た', 'フランス', 'の', 'マクロン', '大統領', 'は', '、', 'アメリカ', 'と', 'イラン', 'の', '関係', '改善', 'に', '努め', 'て', 'き', 'た', '。', '\\n']\n",
      "26\n",
      "(16, 45, 200)\n",
      "(16, 2)\n"
     ]
    }
   ],
   "source": [
    "import csv\n",
    "import numpy as np\n",
    "import MeCab\n",
    "from sklearn.model_selection import train_test_split\n",
    "from gensim.models.keyedvectors import KeyedVectors\n",
    "from keras.layers import Dense,LSTM,Activation,Dropout\n",
    "from keras.models import Sequential\n",
    "\n",
    "MAX_LEN = 45\n",
    "MECAB = MeCab.Tagger(\"-Owakati\")\n",
    "SIZE_OF_W2V = 200\n",
    "W2V = KeyedVectors.load_word2vec_format('../data/embeddings/entity_vector.model.bin', binary=True)\n",
    "\n",
    "def prepare_y(y):\n",
    "    if y == \"fin\":\n",
    "        return [1,0]\n",
    "    else:\n",
    "        return [0,1]\n",
    "    \n",
    "def get_embeddings(token):\n",
    "    try:\n",
    "        return W2V[token]\n",
    "    except:\n",
    "        return [0] * SIZE_OF_W2V\n",
    "\n",
    "def prepare_x(x):\n",
    "    tmp = []\n",
    "    tokens = MECAB.parse(x).split(\" \")\n",
    "    print(tokens)\n",
    "    print(len(tokens))\n",
    "    for token in tokens:\n",
    "        if token is not \"\\n\":\n",
    "            tmp.append(get_embeddings(token))\n",
    "    \n",
    "    # zero padding    \n",
    "    for i in range(0, MAX_LEN - len(tokens) + 1):\n",
    "        tmp.append([0] * SIZE_OF_W2V)\n",
    "    \n",
    "    return tmp\n",
    "    \n",
    "x_data = []\n",
    "y_data = []\n",
    "\n",
    "with open('../data/training/news.csv') as csvfile:\n",
    "    reader = csv.DictReader(csvfile)\n",
    "    for row in reader:\n",
    "        x_data.append(prepare_x(row[\"x\"]))\n",
    "        y_data.append(prepare_y(row[\"y\"]))\n",
    "        \n",
    "x_data = np.array(x_data)\n",
    "y_data = np.array(y_data)\n",
    "\n",
    "x_train, x_test, y_train, y_test = train_test_split(x_data, y_data, test_size=0.2)\n",
    "\n",
    "print(x_train.shape)\n",
    "print(y_train.shape)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Train model"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Epoch 1/10\n",
      "16/16 [==============================] - 2s 103ms/step - loss: 0.6929 - acc: 0.4688\n",
      "Epoch 2/10\n",
      "16/16 [==============================] - 1s 38ms/step - loss: 0.6891 - acc: 0.5938\n",
      "Epoch 3/10\n",
      "16/16 [==============================] - 1s 44ms/step - loss: 0.6662 - acc: 0.6562\n",
      "Epoch 4/10\n",
      "16/16 [==============================] - 1s 42ms/step - loss: 0.6045 - acc: 0.6875\n",
      "Epoch 5/10\n",
      "16/16 [==============================] - 1s 37ms/step - loss: 0.3806 - acc: 1.0000\n",
      "Epoch 6/10\n",
      "16/16 [==============================] - 1s 37ms/step - loss: 0.2045 - acc: 1.0000\n",
      "Epoch 7/10\n",
      "16/16 [==============================] - 1s 43ms/step - loss: 0.0843 - acc: 1.0000\n",
      "Epoch 8/10\n",
      "16/16 [==============================] - 1s 40ms/step - loss: 0.0303 - acc: 1.0000\n",
      "Epoch 9/10\n",
      "16/16 [==============================] - 1s 41ms/step - loss: 0.0199 - acc: 1.0000\n",
      "Epoch 10/10\n",
      "16/16 [==============================] - 1s 39ms/step - loss: 0.0088 - acc: 1.0000\n"
     ]
    },
    {
     "data": {
      "text/plain": [
       "<keras.callbacks.History at 0x15a9a7790>"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "def create_model():\n",
    "    model = Sequential()\n",
    "    # units means output units   \n",
    "    model.add(LSTM(units=64, input_shape=(MAX_LEN, SIZE_OF_W2V)))\n",
    "    model.add(Activation('relu'))\n",
    "    model.add(Dropout(0.25))\n",
    "    model.add(Dense(64))\n",
    "    model.add(Activation('relu'))\n",
    "    model.add(Dropout(0.25))\n",
    "    model.add(Dense(2))\n",
    "    model.add(Activation('sigmoid'))\n",
    "    model.compile(optimizer='adam',loss='binary_crossentropy',metrics=['accuracy'])\n",
    "\n",
    "    return model\n",
    "\n",
    "model = create_model()\n",
    "model.fit(x_train, y_train, batch_size=1, epochs=10, verbose=1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Test"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "5/5 [==============================] - 0s 37ms/step\n",
      "error: 0.0062434314750134945, accuracy: 1.0\n"
     ]
    }
   ],
   "source": [
    "results = model.evaluate(x_test, y_test)\n",
    "print(f\"error: {results[0]}, accuracy: {results[1]}\")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Predict"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "['イラン', '核', '合意', 'に', '締結', 'し', 'た', 'フランス', 'の', 'マクロン', '大統領', 'は', '、', 'アメリカ', 'と', 'イラン', 'の', '関係', '改善', 'に', '努め', 'て', 'き', 'た', '。', '\\n']\n",
      "26\n",
      "[[0.99629265 0.00341535]]\n",
      "イラン核合意に締結したフランスのマクロン大統領は、アメリカとイランの関係改善に努めてきた。 is financial \n",
      "\n",
      "['５', '回', '２', '死', '一', '、', '二塁', 'から', '左', '前', '安打', 'で', '出塁', '。', '\\n']\n",
      "15\n",
      "[[0.0085403  0.99602604]]\n",
      "５回２死一、二塁から左前安打で出塁。 is sports \n",
      "\n",
      "['１', '点', 'リード', 'の', '五', '回', '。', '先頭', 'で', '打席', 'に', '立ち', '、', '３', '球', '目', 'の', 'ファウル', 'が', '左足', 'を', '直撃', 'し', 'た', '。', '\\n']\n",
      "26\n",
      "[[0.00853086 0.9960551 ]]\n",
      "１点リードの五回。先頭で打席に立ち、３球目のファウルが左足を直撃した。 is sports \n",
      "\n",
      "['１０月', '１', '日', 'の', '消費', '税', '１', '０', '％', '引き上げ', 'まで', '１', 'カ月', '。', '\\n']\n",
      "15\n",
      "[[0.996292   0.00342015]]\n",
      "１０月１日の消費税１０％引き上げまで１カ月。 is financial \n",
      "\n"
     ]
    }
   ],
   "source": [
    "def translate_y(y):\n",
    "    print(y)\n",
    "    if y.flat[0] >= y.flat[1]:\n",
    "        return \"financial\"\n",
    "    else:\n",
    "        return \"sports\"\n",
    "        \n",
    "def do_prediction(x):\n",
    "    label = translate_y(model.predict(np.array([prepare_x(x)])))\n",
    "    print(f\"{x} is {label} \\n\")\n",
    "\n",
    "do_prediction(\"イラン核合意に締結したフランスのマクロン大統領は、アメリカとイランの関係改善に努めてきた。\")\n",
    "do_prediction(\"５回２死一、二塁から左前安打で出塁。\")\n",
    "do_prediction(\"１点リードの五回。先頭で打席に立ち、３球目のファウルが左足を直撃した。\")\n",
    "do_prediction(\"１０月１日の消費税１０％引き上げまで１カ月。\")"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "venv",
   "language": "python",
   "name": "venv"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
