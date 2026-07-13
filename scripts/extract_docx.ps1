$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$parentDir = Split-Path -Parent $scriptDir
$docxPath = Join-Path $parentDir "BIEN_BAN_HOP_TRIEN_KHAI_WEBSITE_CRM.docx"
$tempZip = Join-Path $parentDir "temp_docx.zip"
$tempDir = Join-Path $parentDir "temp_docx_extract"

New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
Copy-Item $docxPath $tempZip -Force
Expand-Archive -Path $tempZip -DestinationPath $tempDir -Force
Remove-Item $tempZip -Force

$xmlPath = Join-Path $tempDir "word/document.xml"
if (Test-Path $xmlPath) {
    [xml]$xml = Get-Content -Path $xmlPath -Encoding UTF8
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    $paragraphs = $xml.SelectNodes("//w:p", $ns) | ForEach-Object {
        $pText = $_.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.InnerText }
        $pText -join ""
    }
    $outPath = Join-Path $parentDir "bien_ban_hop.txt"
    $paragraphs -join "`r`n" | Out-File -FilePath $outPath -Encoding utf8
    Write-Output "SUCCESS"
} else {
    Write-Output "XML NOT FOUND AT $xmlPath"
}
Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
