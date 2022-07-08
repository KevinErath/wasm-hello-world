;; hallo_welt.wat
(module
  ;; Importieren der JavaScript-Funktion print_to_log
  (import "env" "write" (func $js_write (param i32)))

  ;; Bereitstellen einer Speicherseite
  (memory $0 1)
  (export "pagememory" (memory $0))

  ;; Füge den null-terminierten String an Adresse 0 hinzu 
  (data (i32.const 0) "Hallo, Welt!\00")

  ;; Definiert unsere Methode und welche für JavaScript exportiert wird
  (func $print_hello_world
    (call $js_write (i32.const 0))
  )
  (export "print_hello_world" (func $print_hello_world))
)