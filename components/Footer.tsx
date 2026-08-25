export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted sm:px-6">
        <p className="font-heading text-lg font-bold text-muted-strong">
          二郎系マガジン
        </p>
        <p className="mt-2 max-w-2xl leading-relaxed">
          二郎系ラーメンにまつわる食べ歩き記録・お店情報をまとめる編集メディアです。
          掲載内容は個人の体験・見解に基づく情報であり、店舗の公式情報とは異なる場合があります。
        </p>
        <p className="mt-6 text-xs text-muted">
          &copy; {new Date().getFullYear().toString()} 二郎系マガジン
        </p>
      </div>
    </footer>
  );
}
