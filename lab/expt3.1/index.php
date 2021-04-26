<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, shrink-to-fit=no">
        <title>IDE</title>        
        <link rel='icon' href='/lab/images/favicon.ico' type='image/x-icon'>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Muli:400,700&amp;display=swap" rel="stylesheet">
        <link href="/lab/css/stylev258e3.css?stamp=1578720149" rel="stylesheet">
        <link href="/lab/css/ided6ca.css?stamp=1575357807" rel="stylesheet">
        <script defer type="text/javascript" src="/lab/js/library/dependency.js"></script>
        <script defer type="text/javascript" src="/lab/js/steroid121a.js?v=11111"></script>
        <script defer src="/lab/unpkg.com/muuri%400.8.0/dist/muuri.min.js"></script>
        <script defer src="/lab/unpkg.com/ace-builds%401.4.8/src-min-noconflict/ace.js" type="text/javascript"></script>
        <script defer src="/lab/unpkg.com/split.js%401.6.4/dist/split.min.js"></script> 
    </head>
    <body>
        <main role="main" class="container-fluid main-body" id="ide-page">
            <header class="bg-white px-2 row">
                <nav class="col navbar navbar-expand-md navbar-light">
                    <button class="btn" style="color:#00ad45">
                        <b><a href="/lab/">Vjec Programming in C- Automated Lab</a></b>
                    </button>
                    <div class="list-group list-group-horizontal-md user-profile">
                        <button class="btn" style="color:black">
                            <b><a href="/lab/">Home</a></b>
                        </button>
                        <button class="btn" style="color:black" >
                            <b><a href="/logout.php">Log out</a></b>
                        </button>
                    </div>
                </nav>
            </header>
            <div class="row">
                <div class="col-md-4">
                    <strong>Question</strong>
                    <p>Familiarize Console I/O and operators in C using simple programs in C</p>
                    <p>Display “Hello World”</p>
                    <div class="flex-fill flex-grow desktop-view split" id="two">
                        <ul class="nav nav-tabs ml-1" id="resultTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link p-2" id="output-tab" data-toggle="tab" href="#output" role="tab" aria-controls="output" aria-selected="false">OUTPUT</a>
                            </li>
                        </ul>
                        <div class="tab-content p-1">
                            <div class="tab-pane fade p-2" role="tabpanel" id="output" aria-labelledby="output-tab">
                                <div class="outputValue outputBox">
                                    <pre>Your Output will be displayed here</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="col-md-8">
            <div class="row d-flex pt-2 codeContainer">
                <div class="flex-fill flex-grow split" id="one">
                    <div class="d-flex align-items-end justify-content-between border-bottom">
                        <ul class="nav nav-tabs m-0 flex-nowrap" id="resultTabMobile" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active p-1" id="editor-tab-mobile" data-toggle="tab" href="#editor-mobile" role="tab" aria-controls="editor-mobile" aria-selected="true">EDITOR</a>
                            </li>

                        </ul>
                        <div class="d-flex align-items-end">
                            <button class="btn d-flex align-items-end justify-content-between p-1 mr-1" id="runCode">
                                <span class="material-icons text-white px-1">play_arrow</span>
                                <span class="align-self-center text-white px-1">Run</span>
                            </button>
                            
                        </div>
                    </div>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="editor-mobile" role="tabpanel" aria-labelledby="editor-tab">
                        <div id="editor"></div>
                    </div>
                </div>
            </div>
            
            </div>
            </div>
        </main>
        <div class="modal fade" id="editorSettingModal" tabindex="-1" role="dialog" aria-labelledby="editorSettingModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-slideout" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <h6 class="font-weight-bold p-2">Font Size</h6>
                        <div class="d-flex align-items-center justify-content-between p-2">
                            <input id="editor-font-size" type="range" name="fontSize" class="custom-range" min="10" max="40" value="14" step="1">
                        </div>
                        <h6 class="font-weight-bold p-2">Theme</h6>
                        <div class="form-group d-flex justify-content-around p-2" id="themeControl">
                            <div class="custom-control custom-radio custom-control-inline">
                                <input id="darkTheme" type="radio" name="theme" value="monokai" class="custom-control-input" checked>
                                <label for="darkTheme" class="custom-control-label">Dark</label>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between p-3">
                        <h6 class="col pl-0 font-weight-bold">Show Gutter</h6>
                            <div class="d-flex col justify-content-start">
                                <label class="switch">
                                    <input type="checkbox" id="showGutter" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between p-3">
                            <h6 class="col pl-0 font-weight-bold">Line Numbers</h6>
                            <div class="d-flex col justify-content-start">
                                <label class="switch">
                                    <input type="checkbox" id="lineNumber" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript" defer src="/lab/js/ide.js"></script>
    </body>
</html>
