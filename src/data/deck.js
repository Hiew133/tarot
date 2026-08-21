// Bộ Ẩn Chính (Major Arcana) — 22 lá.
//
// Mỗi lá:
//   num       số La Mã
//   name      tên lá
//   key       từ khoá một chữ, hiện cạnh số
//   keywords  vài từ khoá cho người quen đọc bài, hiện thành hàng chip
//   short     một câu, dùng ở gợi ý trên bàn bài khi vừa lật
//   long      nghĩa xuôi, đoạn chính ở màn chi tiết
//   rev       nghĩa ngược: { short, long }
//   imagery   biểu tượng trong tranh Rider–Waite–Smith mà app đang hiện
//   ask       câu để người đọc tự vấn, không phải lời khuyên
//
// Giọng: nói thẳng, cụ thể, không hù doạ, không phán chuyện sinh tử — đúng
// tinh thần trang "Về reader". Lá ngược **không phải** lá xấu: thường là cùng
// một năng lượng nhưng đang kẹt, đang quay vào trong, hoặc đang quá tay.
export const DECK = [
  {
    num: '0',
    name: 'Kẻ Khờ',
    key: 'khởi đầu',
    keywords: ['bắt đầu', 'liều lành mạnh', 'chưa có bản đồ'],
    short: 'Bạn đang đứng trước một thứ chưa có bản đồ.',
    long:
      'Chưa biết gì hết mà vẫn muốn đi — đó không phải dại, đó là bắt đầu. Lá này ' +
      'khuyên bạn cứ bước, phần còn lại tính sau, miễn là đừng giả vờ mình đã biết ' +
      'hết. Cái bạn thiếu là kinh nghiệm, không phải tư cách. Kinh nghiệm thì chỉ ' +
      'có một cách lấy.',
    rev: {
      short: 'Muốn đi mà chân chưa nhấc, hoặc nhấc mà nhắm mắt.',
      long:
        'Ngược lại thì thành hai kiểu: hoặc bạn đứng mãi ở mép, gọi sự do dự là ' +
        'thận trọng; hoặc bạn lao đi mà cố tình không nhìn cái giá phải trả. Cả hai ' +
        'đều là cách né việc nhìn thẳng vào bước kế tiếp.',
    },
    imagery:
      'Người trẻ bước tới mép vực, mắt nhìn trời chứ không nhìn chân. Con chó nhỏ ' +
      'sủa dưới gót — không rõ nó cản hay nó giục. Tay nải bé tí: đi xa mà mang ít.',
    ask: 'Điều gì bạn đang chờ biết đủ rồi mới làm — mà thật ra chỉ làm mới biết?',
  },
  {
    num: 'I',
    name: 'Pháp Sư',
    key: 'chủ động',
    keywords: ['đủ công cụ', 'bắt tay vào', 'tập trung'],
    short: 'Bạn đã có đủ thứ cần rồi, chỉ là chưa dùng.',
    long:
      'Kỹ năng, mối quan hệ, thời gian — đủ cả. Cái thiếu là quyết định bắt tay ' +
      'vào. Đừng chờ thêm một khoá học nữa. Lá này hay rơi vào lúc người ta chuẩn ' +
      'bị quá lâu cho một việc vốn chỉ cần bắt đầu là xong một nửa.',
    rev: {
      short: 'Có đồ nghề mà loay hoay, hoặc dùng vào việc không đáng.',
      long:
        'Năng lực vẫn còn nguyên, nhưng đang tản ra nhiều hướng cùng lúc nên chẳng ' +
        'hướng nào tới nơi. Đôi khi lá ngược còn nói tới việc dùng cái khéo để thuyết ' +
        'phục người khác — hoặc thuyết phục chính mình — về một thứ bạn không thật tin.',
    },
    imagery:
      'Trên bàn bày đủ bốn bộ: gậy, cốc, kiếm, tiền. Một tay chỉ trời, một tay chỉ ' +
      'đất — cái gì nghĩ ra được thì làm ra được. Vòng vô cực trên đầu.',
    ask: 'Bạn đang gọi việc gì là "chuẩn bị" trong khi nó thật ra là trì hoãn?',
  },
  {
    num: 'II',
    name: 'Nữ Tư Tế',
    key: 'chờ đợi',
    keywords: ['trực giác', 'chưa tới lúc', 'biết mà chưa nói'],
    short: 'Câu trả lời có rồi, nhưng chưa tới lúc nói ra.',
    long:
      'Bạn cảm thấy điều gì đó mà chưa gọi tên được. Cứ để yên vài hôm, đừng ép mình ' +
      'phải kết luận ngay hôm nay. Lá này không bảo bạn thụ động — nó bảo có loại ' +
      'hiểu biết chỉ nổi lên khi mình thôi khuấy nước.',
    rev: {
      short: 'Bạn đang nghe mọi người trừ chính mình.',
      long:
        'Hoặc là bạn biết câu trả lời nhưng bác bỏ nó vì nó bất tiện, hoặc bạn đang ' +
        'giữ kín một điều mà việc giữ kín đang làm bạn mệt hơn là nói ra. Im lặng có ' +
        'lúc là khôn ngoan, có lúc chỉ là né.',
    },
    imagery:
      'Ngồi giữa hai cột đen trắng, sau lưng là tấm màn che khu vườn — thấy được ' +
      'một phần, phần còn lại phải bước qua mới biết. Cuộn sách trong lòng chỉ hé một nửa.',
    ask: 'Bạn đã biết gì rồi mà vẫn đang đi hỏi cho tới khi có người nói khác đi?',
  },
  {
    num: 'III',
    name: 'Nữ Hoàng',
    key: 'nuôi dưỡng',
    keywords: ['chăm sóc', 'sung túc', 'kiên nhẫn với cái còn non'],
    short: 'Thứ gì đang lớn lên thì cần được chăm, kể cả bạn.',
    long:
      'Lá này thường xuất hiện khi ai đó lo cho mọi người trừ chính mình. Ăn uống, ' +
      'ngủ nghỉ, và những dự án còn non — chăm đều tay. Cái gì đang lớn thì cần thời ' +
      'gian chứ không cần bị giục; kéo mầm lên cho nhanh là cách chắc chắn để nó chết.',
    rev: {
      short: 'Chăm tới mức nghẹt, hoặc quên mất phần của mình.',
      long:
        'Ngược lại hay là lúc sự quan tâm biến thành kiểm soát, hoặc lúc bạn cho đi ' +
        'mãi rồi âm thầm chờ được đền. Cũng có khi đơn giản là bạn đã cạn — không cho ' +
        'ai được gì nữa vì chính mình chưa được rót đầy.',
    },
    imagery:
      'Ngồi giữa đồng lúa chín, suối chảy sau lưng, đệm mềm chứ không phải ngai cứng. ' +
      'Quyền lực ở đây là quyền làm cho thứ khác sống được.',
    ask: 'Nếu người bạn thương đang ở tình cảnh của bạn, bạn sẽ bảo họ nghỉ hay bảo họ cố?',
  },
  {
    num: 'IV',
    name: 'Hoàng Đế',
    key: 'khuôn khổ',
    keywords: ['ranh giới', 'kỷ luật', 'dựng khung'],
    short: 'Dựng cái khung trước, rồi mọi thứ tự vào chỗ.',
    long:
      'Bạn đang mệt vì thiếu ranh giới chứ không phải thiếu cố gắng. Đặt giờ giấc, ' +
      'đặt giới hạn, nói không một lần cho rõ. Cấu trúc nghe có vẻ gò bó, nhưng thứ ' +
      'thật sự làm người ta kiệt sức là phải quyết định lại cùng một việc mỗi ngày.',
    rev: {
      short: 'Cứng tới mức gãy, hoặc chẳng có gì để tựa.',
      long:
        'Một là kỷ luật đã thành cứng nhắc — quy tắc còn đó nhưng chẳng ai nhớ nó ' +
        'sinh ra để làm gì. Hai là ngược hẳn: không có khung nào cả, và mọi việc trôi ' +
        'theo ai lên tiếng to nhất hôm đó.',
    },
    imagery:
      'Ngai đá đầu cừu, áo giáp dưới lớp áo choàng đỏ. Núi trọc phía sau — nơi này ' +
      'không tự mọc gì, cái gì đứng được là do dựng lên.',
    ask: 'Cái ranh giới nào bạn biết mình cần đặt mà vẫn chưa nói thành lời?',
  },
  {
    num: 'V',
    name: 'Giáo Hoàng',
    key: 'chỉ dẫn',
    keywords: ['học hỏi', 'lề lối', 'người đi trước'],
    short: 'Có người từng đi qua chuyện này rồi — hỏi đi.',
    long:
      'Không phải việc gì cũng phải tự mò. Lá này nói tới giá trị của lối cũ: thầy, ' +
      'sách, quy trình, người đã làm rồi. Chịu học một cách bài bản lúc này tiết kiệm ' +
      'cho bạn hàng tháng trời thử sai.',
    rev: {
      short: 'Lối cũ không còn vừa với bạn nữa.',
      long:
        'Đến lúc bạn hỏi tại sao vẫn làm theo cách này — và câu trả lời chỉ là "vì ' +
        'xưa nay vẫn thế". Lá ngược cho phép bạn bước ra, nhưng bước ra vì đã hiểu ' +
        'chứ không phải vì lười hiểu.',
    },
    imagery:
      'Ngồi giữa hai cột xám, hai người quỳ phía dưới nghe giảng. Hai chìa khoá bắt ' +
      'chéo dưới chân — mở được cửa, nhưng phải qua tay người giữ chìa.',
    ask: 'Bạn đang làm theo lề lối nào mà chưa từng hỏi nó phục vụ ai?',
  },
  {
    num: 'VI',
    name: 'Người Yêu',
    key: 'lựa chọn',
    keywords: ['giá trị', 'gắn kết', 'chọn là mất phần còn lại'],
    short: 'Chọn cái này nghĩa là buông cái kia — và bạn biết rồi.',
    long:
      'Lá này ít khi nói về tình yêu như người ta tưởng; nó nói về việc chọn theo ' +
      'thứ mình thật sự coi trọng. Hai đường đều được, nhưng chỉ một đường hợp với ' +
      'người bạn đang muốn trở thành. Phần khó không phải là biết chọn gì, mà là ' +
      'chịu mất phần còn lại.',
    rev: {
      short: 'Muốn cả hai, nên chưa thật sự ở đâu cả.',
      long:
        'Ngược lại thường là lúc người ta để ngỏ mọi cửa và gọi đó là linh hoạt. ' +
        'Cũng có khi là lệch pha trong một mối quan hệ: hai người đang cam kết với ' +
        'hai thứ khác nhau mà chưa ai nói ra.',
    },
    imagery:
      'Hai người đứng dưới thiên thần, mỗi người một cái cây sau lưng — một cây có ' +
      'rắn, một cây đang cháy. Cả hai đều nhìn lên, không nhìn nhau.',
    ask: 'Nếu buộc phải mất một trong hai, mất cái nào bạn thấy nhẹ người hơn?',
  },
  {
    num: 'VII',
    name: 'Cỗ Xe',
    key: 'tiến tới',
    keywords: ['ý chí', 'giữ hướng', 'kéo hai đầu về một mối'],
    short: 'Đi được, nhưng phải tự cầm cương.',
    long:
      'Hai lực trái chiều trong bạn vẫn còn đó — lá này không bảo chúng biến mất, ' +
      'nó bảo bạn buộc cả hai vào cùng một hướng. Thắng ở đây là thắng nhờ giữ hướng ' +
      'lâu hơn người khác, không phải nhờ chạy nhanh hơn.',
    rev: {
      short: 'Guồng vẫn quay mà xe đứng yên.',
      long:
        'Có thể bạn đang cố sức về một hướng mình không còn muốn tới, chỉ vì đã đi ' +
        'được nửa đường. Cũng có thể mỗi hôm bạn đổi hướng một lần, và năng lượng ' +
        'tiêu hết vào việc quay đầu.',
    },
    imagery:
      'Hai con nhân sư đen trắng phía trước, không có dây cương — người đánh xe điều ' +
      'khiển bằng tư thế chứ không bằng dây. Thành phố lùi lại sau lưng.',
    ask: 'Bạn đang cố tới đích nào — và đó còn là đích bạn chọn, hay đích bạn lỡ chọn?',
  },
  {
    num: 'VIII',
    name: 'Sức Mạnh',
    key: 'mềm bền',
    keywords: ['điềm tĩnh', 'kiên nhẫn', 'không cần thắng to'],
    short: 'Không phải ghì cho chặt, mà là không buông.',
    long:
      'Sức mạnh ở lá này là loại không ồn: chịu được cơn giận của mình, chịu được ' +
      'người khó chịu, chịu được việc chưa có kết quả. Bạn không cần áp đảo tình ' +
      'huống, chỉ cần đừng bỏ cuộc trước nó.',
    rev: {
      short: 'Đang gồng, và cái gồng đó tốn hơn bạn tưởng.',
      long:
        'Ngược lại hay là lúc người ta tưởng mình bình tĩnh nhưng thật ra đang nén. ' +
        'Nén thì có hạn. Cũng có khi là mất kiên nhẫn với chính mình — tự mắng mình ' +
        'vì chưa khá lên, trong khi thứ cần là thời gian.',
    },
    imagery:
      'Người phụ nữ khép miệng sư tử bằng hai bàn tay trần, mặt vẫn dịu. Vòng hoa ' +
      'trên đầu, vòng vô cực phía trên — cùng biểu tượng với Pháp Sư, nhưng hướng vào trong.',
    ask: 'Chuyện này cần bạn mạnh hơn, hay cần bạn ở lại lâu hơn?',
  },
  {
    num: 'IX',
    name: 'Ẩn Sĩ',
    key: 'lùi lại',
    keywords: ['một mình', 'nhìn lại', 'đi chậm có đèn'],
    short: 'Lùi ra một quãng thì mới thấy được hình.',
    long:
      'Không phải trốn, là tách ra để nghe rõ. Lá này hợp lúc bạn đã hỏi quá nhiều ' +
      'người và mỗi người nói một kiểu. Tắt bớt đi, ở với câu hỏi vài hôm. Cái đèn ' +
      'trong tay chỉ soi được vài bước — đủ để đi, không đủ để thấy hết đường.',
    rev: {
      short: 'Một mình quá lâu thì thành trốn.',
      long:
        'Ranh giới giữa tĩnh lặng và cô lập rất mỏng, và lá ngược là lúc đã bước qua ' +
        'ranh giới đó. Ngược lại cũng có khi nói điều trái hẳn: bạn đang bận tới mức ' +
        'không cho mình một phút nào yên.',
    },
    imagery:
      'Ông già đứng trên đỉnh tuyết, một tay đèn lồng có ngôi sao sáu cánh, một tay ' +
      'gậy. Không có ai xung quanh, và ông không tìm ai.',
    ask: 'Bạn đang cần thêm lời khuyên, hay cần yên tĩnh đủ lâu để nghe cái mình đã biết?',
  },
  {
    num: 'X',
    name: 'Bánh Xe',
    key: 'chu kỳ',
    keywords: ['thời điểm', 'đổi vận', 'phần không do bạn'],
    short: 'Có phần chuyện này không nằm trong tay bạn.',
    long:
      'Lá này nhắc rằng mọi thứ đều đang xoay — kể cả đoạn đang tệ. Việc của bạn là ' +
      'nhận ra chỗ nào mình xoay được và chỗ nào chỉ có thể chờ. Nhầm hai chỗ đó với ' +
      'nhau là nguồn gốc của phần lớn cái mệt.',
    rev: {
      short: 'Đang ở đáy vòng, và đáy thì cũng là một phần của vòng.',
      long:
        'Ngược lại thường là lúc chuỗi việc không thuận nối nhau, hoặc lúc bạn cứ lặp ' +
        'lại đúng một vòng cũ mà tưởng mình đang đi tới. Vòng lặp chỉ đứt khi có ai đó ' +
        'trong vòng làm khác đi.',
    },
    imagery:
      'Bánh xe giữa trời, bốn sinh vật bốn góc đang đọc sách — cái xoay ở giữa, cái ' +
      'học thì ở ngoài rìa. Rắn trượt xuống một bên, nhân sư ngồi yên trên đỉnh.',
    ask: 'Phần nào của chuyện này bạn đổi được, và phần nào bạn đang tốn sức để cưỡng?',
  },
  {
    num: 'XI',
    name: 'Công Lý',
    key: 'sòng phẳng',
    keywords: ['hệ quả', 'thẳng thắn', 'nhận phần của mình'],
    short: 'Chuyện này có nhân có quả, và bạn biết phần nào là của mình.',
    long:
      'Lá này không phán ai đúng ai sai — nó đòi bạn nhìn thẳng vào hệ quả của việc ' +
      'mình đã làm và chưa làm. Sòng phẳng với người khác thì dễ hơn sòng phẳng với ' +
      'chính mình; lá này đòi cả hai.',
    rev: {
      short: 'Cán cân đang lệch, và lệch không phải do vô tình.',
      long:
        'Có thể bạn đang gánh phần trách nhiệm không phải của mình, có thể bạn đang ' +
        'né phần của mình. Cũng có khi là chuyện thật sự bất công — và điều lá ngược ' +
        'nói là: gọi đúng tên nó đi, đừng tự nhận là mình đáng bị vậy.',
    },
    imagery:
      'Ngồi thẳng giữa hai cột, kiếm dựng đứng ở tay phải, cân ở tay trái. Kiếm hướng ' +
      'lên: quyết định là để cắt cho rõ, không phải để trừng phạt.',
    ask: 'Phần nào trong chuyện này là hệ quả của một lựa chọn bạn đã biết trước?',
  },
  {
    num: 'XII',
    name: 'Người Treo Ngược',
    key: 'đổi góc',
    keywords: ['dừng lại', 'nhìn ngược', 'chịu chờ'],
    short: 'Nhìn từ chỗ khác thì bài toán khác hẳn.',
    long:
      'Lá này là quãng treo: không tiến được, và đó không phải thất bại. Đôi khi thứ ' +
      'chặn bạn không phải hoàn cảnh mà là góc nhìn. Chịu ở yên trong lúc chưa rõ là ' +
      'một việc khó, và lá này nói nó đáng.',
    rev: {
      short: 'Chờ mãi thành mắc kẹt, hoặc dừng mà không nhìn lại gì.',
      long:
        'Ngược lại là lúc quãng dừng mất hết ý nghĩa: bạn vẫn treo đó nhưng chẳng còn ' +
        'suy nghĩ gì nữa, chỉ chờ cho qua. Cũng có khi là bạn đang giục mình đi tiếp ' +
        'trong khi chưa hiểu vì sao lần trước không xong.',
    },
    imagery:
      'Treo ngược một chân vào cây chữ T, chân kia gập lại thành hình số bốn. Mặt ' +
      'bình thản, quanh đầu có hào quang — tư thế này là tự chọn.',
    ask: 'Nếu điều bạn đang tin về chuyện này là sai, thì chuyện này trông ra sao?',
  },
  {
    num: 'XIII',
    name: 'Cái Chết',
    key: 'kết thúc',
    keywords: ['khép lại', 'chuyển giai đoạn', 'buông cái đã xong'],
    short: 'Một chuyện đã hết, để nó hết.',
    long:
      'Không phải điềm xấu. Là dấu hiệu bạn đang cố giữ thứ đã xong việc của nó — ' +
      'công việc, thói quen, hay một cách nghĩ cũ. Cái mới không chen vào được khi ' +
      'chỗ vẫn còn bị chiếm. Kết thúc cho tử tế cũng là một kỹ năng.',
    rev: {
      short: 'Biết là xong rồi mà vẫn chưa chịu đặt xuống.',
      long:
        'Ngược lại là quãng dùng dằng: bạn đã hiểu chuyện này hết rồi nhưng vẫn quay ' +
        'lại, vẫn nhắn thêm một tin, vẫn để ngỏ. Sự dùng dằng đó tốn nhiều hơn một cú ' +
        'dứt điểm, chỉ là nó tốn từ từ nên khó thấy.',
    },
    imagery:
      'Bộ xương cưỡi ngựa trắng, cờ hoa hồng trắng. Vua đã ngã, người còn lại thì quỳ ' +
      'hoặc xin. Phía chân trời có mặt trời mọc giữa hai cột.',
    ask: 'Bạn đang giữ điều gì chỉ vì đã bỏ nhiều công vào nó?',
  },
  {
    num: 'XIV',
    name: 'Điều Độ',
    key: 'cân bằng',
    keywords: ['liều lượng', 'pha trộn', 'đi đường dài'],
    short: 'Đúng liều thì thành thuốc, quá liều thì thành chuyện khác.',
    long:
      'Lá này nói về nhịp: làm ít quá thì không tới, làm nhiều quá thì gãy. Nó cũng ' +
      'nói tới việc trộn hai thứ tưởng như không hợp — nghỉ và làm, mềm và cứng — ' +
      'thành một tỉ lệ chỉ bạn mới biết là bao nhiêu.',
    rev: {
      short: 'Đang lệch hẳn về một phía và cố gọi đó là tạm thời.',
      long:
        'Ngược lại thường là lúc mọi thứ dồn hết vào một chỗ: một việc, một người, ' +
        'một nỗi lo — và phần đời còn lại bị bỏ đói. "Xong đợt này rồi tính" là câu ' +
        'hay đi cùng lá ngược này.',
    },
    imagery:
      'Thiên thần rót nước qua lại giữa hai cái cốc, một chân trên cạn một chân dưới ' +
      'nước. Dòng nước chảy ngang chứ không đổ thẳng — pha, không phải trút.',
    ask: 'Thứ gì trong đời bạn đang bị bỏ đói để nuôi một thứ khác?',
  },
  {
    num: 'XV',
    name: 'Quỷ Dữ',
    key: 'ràng buộc',
    keywords: ['thói quen', 'lệ thuộc', 'xích lỏng'],
    short: 'Sợi xích này lỏng hơn bạn nghĩ.',
    long:
      'Lá này nói về thứ giữ chân bạn mà bạn có phần đồng ý cho nó giữ: một công ' +
      'việc, một mối quan hệ, một thói quen, một nỗi sợ. Không phải để bạn tự trách ' +
      '— để bạn thấy rằng chỗ nào mình có phần thì chỗ đó mình đổi được.',
    rev: {
      short: 'Đang nhìn thấy sợi xích, và đó là bước đầu.',
      long:
        'Ngược lại thường là chuyển động tốt: bạn bắt đầu gọi đúng tên thứ đang trói ' +
        'mình. Giai đoạn này khó chịu vì nhìn ra rồi mà chưa gỡ được — nhưng nhìn ra ' +
        'rồi thì không quay lại không biết được nữa.',
    },
    imagery:
      'Hai người bị xích vào bệ, nhưng vòng xích rộng hơn cổ — nhấc qua đầu là ra ' +
      'được. Cả hai không nhìn lên. Đèn chúc xuống thay vì soi.',
    ask: 'Nếu chuyện này thật sự không đổi được, bạn đang được gì từ việc tin như vậy?',
  },
  {
    num: 'XVI',
    name: 'Tòa Tháp',
    key: 'vỡ ra',
    keywords: ['đổ vỡ', 'lộ ra', 'xây lại nền'],
    short: 'Cái đổ hôm nay vốn đã nứt từ lâu.',
    long:
      'Sốc, nhưng không oan. Sau đợt này bạn sẽ xây lại trên nền thật hơn — đừng vội ' +
      'dựng lại y như cũ. Cái đau của lá này phần lớn đến từ việc mình đã dồn nhiều ' +
      'thứ vào một cấu trúc mà trong lòng đã ngờ là không vững.',
    rev: {
      short: 'Đang chống đỡ một thứ đằng nào cũng đổ.',
      long:
        'Ngược lại có thể là cú đổ đã bị hoãn lại — bạn vá tạm được thêm một thời ' +
        'gian, và phải tự hỏi vá để làm gì. Cũng có khi là cú đổ đã xảy ra bên trong, ' +
        'chưa ai nhìn thấy, và bạn đang một mình biết điều đó.',
    },
    imagery:
      'Sét đánh trúng đỉnh tháp, vương miện bay ra. Hai người rơi xuống. Điều đáng ' +
      'chú ý: sét đánh vào cái vương miện, không đánh vào người.',
    ask: 'Nếu thứ này sụp thật, phần nào bạn sẽ thấy nhẹ đi?',
  },
  {
    num: 'XVII',
    name: 'Ngôi Sao',
    key: 'hy vọng',
    keywords: ['hồi phục', 'thở lại', 'tin một cách nhẹ'],
    short: 'Sau một quãng nặng, trời bắt đầu quang.',
    long:
      'Lá này thường tới ngay sau đoạn khó — không phải để hứa hẹn gì to tát, mà để ' +
      'nói rằng bạn đang lành. Hy vọng ở đây không ồn ào: nó giống việc ngủ lại được, ' +
      'ăn thấy ngon, và bắt đầu tính chuyện xa hơn ngày mai.',
    rev: {
      short: 'Chưa dám tin là mình đã qua đoạn tệ nhất.',
      long:
        'Ngược lại là lúc người ta thủ thế: mọi thứ đã đỡ hơn nhưng vẫn chờ tin xấu, ' +
        'vì tin vào cái đang tốt thì sợ hụt. Đó là phản ứng dễ hiểu, chỉ là nó lấy mất ' +
        'của bạn quãng nghỉ mà bạn đang được phép có.',
    },
    imagery:
      'Người phụ nữ rót nước xuống hồ và xuống đất, một chân chạm nước một chân trên ' +
      'bờ. Trần trụi, không giấu gì. Tám ngôi sao trên trời, một ngôi lớn ở giữa.',
    ask: 'Điều gì đang khá lên mà bạn chưa cho phép mình ghi nhận?',
  },
  {
    num: 'XVIII',
    name: 'Mặt Trăng',
    key: 'mơ hồ',
    keywords: ['chưa rõ', 'nỗi sợ', 'đừng quyết vội'],
    short: 'Trong tối, cái gì cũng trông to hơn thật.',
    long:
      'Lá này là quãng không nhìn rõ: thông tin thiếu, cảm xúc nhiều, và đầu óc tự ' +
      'lấp chỗ trống bằng những kịch bản tệ nhất. Đừng ra quyết định lớn ở đây. Đợi ' +
      'sáng, hoặc đi hỏi cho đủ dữ kiện, rồi hẵng chọn.',
    rev: {
      short: 'Sương đang tan, hoặc bạn đang cố tình không nhìn.',
      long:
        'Ngược lại hay là lúc sự thật bắt đầu lộ ra và bạn thấy nhẹ hơn tưởng tượng. ' +
        'Nhưng nó cũng có mặt kia: tự dối mình một cách rất có tổ chức, giải thích ' +
        'hợp lý cho một thứ mà trong bụng đã biết là không ổn.',
    },
    imagery:
      'Con đường chạy giữa hai tháp về phía xa. Chó và sói cùng tru — cái quen và cái ' +
      'hoang, khó phân biệt trong đêm. Con tôm bò lên từ nước.',
    ask: 'Điều bạn đang sợ — bao nhiêu phần là dữ kiện, bao nhiêu phần là tưởng tượng?',
  },
  {
    num: 'XIX',
    name: 'Mặt Trời',
    key: 'rõ ràng',
    keywords: ['sáng tỏ', 'nhẹ nhõm', 'không phải giấu'],
    short: 'Mọi thứ đơn giản hơn bạn vẫn nghĩ.',
    long:
      'Lá dễ chịu nhất bộ. Chuyện sáng ra, sức khoẻ lên, và bạn thôi phải diễn. Nếu ' +
      'gần đây bạn cứ phải giải thích mình mãi thì lá này báo quãng đó sắp qua — cái ' +
      'gì thật thì tự nó đứng được dưới nắng.',
    rev: {
      short: 'Vui thật nhưng chưa dám nhận, hoặc vui vay mượn.',
      long:
        'Ngược lại không biến lá này thành xấu, chỉ làm nó mờ đi: niềm vui bị hoãn ' +
        'lại, thành công bị hạ giá bằng câu "chưa ăn thua gì". Cũng có khi là gắng ' +
        'tỏ ra ổn trước mặt mọi người trong lúc chưa ổn.',
    },
    imagery:
      'Đứa trẻ cưỡi ngựa trắng, tay giơ cờ đỏ, sau lưng là tường hoa hướng dương. ' +
      'Mặt trời có mặt người, nhìn thẳng. Không có gì trong tranh này bị che.',
    ask: 'Bạn đang phải diễn với ai — và giữ vai đó tốn của bạn bao nhiêu?',
  },
  {
    num: 'XX',
    name: 'Phán Xét',
    key: 'gọi tên',
    keywords: ['nhìn lại', 'quyết định lớn', 'tha cho mình'],
    short: 'Đã đến lúc gọi đúng tên chuyện cũ rồi đi tiếp.',
    long:
      'Lá này là lúc tổng kết: nhìn lại một quãng dài, thấy nó là gì, và chọn xem ' +
      'mang gì theo. Nó thường đi kèm một quyết định đã âm ỉ lâu. Phần khó nhất ' +
      'thường không phải quyết, mà là thôi tự xử mình vì những đoạn đã qua.',
    rev: {
      short: 'Nghe tiếng gọi rồi mà vẫn giả điếc.',
      long:
        'Ngược lại là lúc bạn biết mình cần thay đổi điều gì nhưng cứ hoãn, hoặc cứ ' +
        'xét đi xét lại chính mình mà không đi tới đâu. Tự phê bình mãi không phải là ' +
        'sửa; có lúc nó chỉ là cách ở yên mà trông như đang làm gì đó.',
    },
    imagery:
      'Người đứng dậy từ quan tài, tay giang ra, mặt hướng lên. Thiên thần thổi kèn. ' +
      'Không ai bị kéo đi — họ tự đứng lên.',
    ask: 'Bạn còn đang tính sổ với phiên bản nào của mình mà lẽ ra nên tha rồi?',
  },
  {
    num: 'XXI',
    name: 'Thế Giới',
    key: 'trọn vẹn',
    keywords: ['hoàn thành', 'khép vòng', 'sẵn sàng cho vòng sau'],
    short: 'Một vòng đã đi hết. Ghi nhận đi rồi hẵng tính tiếp.',
    long:
      'Lá cuối bộ: việc xong, bài học đã thành của mình, và bạn không còn là người ' +
      'đứng ở lá số 0 nữa. Cái bẫy ở đây là lao ngay vào vòng tiếp theo mà quên mất ' +
      'phần ghi nhận — mà không ghi nhận thì vòng nào cũng thấy như chưa đủ.',
    rev: {
      short: 'Gần xong mà chưa khép được.',
      long:
        'Ngược lại là quãng còn dở dang: một việc còn thiếu bước cuối, một chuyện cũ ' +
        'chưa nói hết lời. Cũng có khi mọi thứ đã xong trên giấy nhưng trong lòng bạn ' +
        'chưa thấy xong — và cái chưa xong đó mới là cái cần xử.',
    },
    imagery:
      'Người nhảy múa trong vòng nguyệt quế hình bầu dục, hai cây gậy trong tay. Bốn ' +
      'sinh vật ở bốn góc, đúng như lá Bánh Xe — nhưng lần này không ai còn đọc sách nữa.',
    ask: 'Bạn đã hoàn thành việc gì mà chưa từng cho mình một phút để công nhận?',
  },
];
