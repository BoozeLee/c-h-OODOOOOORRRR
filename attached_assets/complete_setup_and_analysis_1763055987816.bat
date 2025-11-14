@echo off
echo =============================================
echo ?? AutomationCodex Complete Setup & Analysis
echo =============================================
echo Installing prerequisites and running GitHub analysis
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ??  This script may need administrator privileges for some installations.
    echo    If installations fail, please run as administrator.
    echo.
)

REM Activate virtual environment
echo ?? Activating virtual environment...
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
    echo ? Virtual environment activated
) else (
    echo ? Virtual environment not found. Creating one...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo ? Virtual environment created and activated
)

REM Install/upgrade pip and dependencies
echo ?? Installing Python dependencies...
python -m pip install --upgrade pip
python -m pip install numpy pandas scipy scikit-learn networkx requests aiohttp beautifulsoup4 matplotlib seaborn

echo.
echo ?? Checking Git installation...

REM Check if Git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Git is not installed. Installing Git...
    
    REM Try different methods to install Git
    echo ?? Attempting to install Git via winget...
    winget install --id Git.Git -e --source winget >nul 2>&1
    if %errorlevel% equ 0 (
        echo ? Git installed successfully via winget
        REM Add Git to PATH for current session
        set "PATH=%PATH%;C:\Program Files\Git\bin"
    ) else (
        echo ??  winget installation failed. Trying chocolatey...
        choco install git -y >nul 2>&1
        if %errorlevel% equ 0 (
            echo ? Git installed successfully via chocolatey
            set "PATH=%PATH%;C:\Program Files\Git\bin"
        ) else (
            echo ? Automatic Git installation failed.
            echo.
            echo ?? Please install Git manually:
            echo    1. Go to: https://git-scm.com/download/windows
            echo    2. Download and install Git for Windows
            echo    3. Make sure to check "Add Git to PATH" during installation
            echo    4. Restart this script after installation
            echo.
            pause
            exit /b 1
        )
    )
    
    REM Refresh environment variables
    echo ?? Refreshing environment...
    call refreshenv >nul 2>&1
    
    REM Verify Git installation
    timeout /t 3 >nul
    git --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ? Git installation verification failed.
        echo Please restart this script or reboot your computer.
        pause
        exit /b 1
    )
) else (
    echo ? Git is already installed
)

git --version
echo.

echo ?? Checking GitHub CLI installation...

REM Check if GitHub CLI is available
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ? GitHub CLI is not installed. Installing GitHub CLI...
    
    echo ?? Attempting to install GitHub CLI via winget...
    winget install --id GitHub.cli >nul 2>&1
    if %errorlevel% equ 0 (
        echo ? GitHub CLI installed successfully via winget
    ) else (
        echo ??  winget installation failed. Trying chocolatey...
        choco install gh -y >nul 2>&1
        if %errorlevel% equ 0 (
            echo ? GitHub CLI installed successfully via chocolatey
        ) else (
            echo ? Automatic GitHub CLI installation failed.
            echo.
            echo ?? Please install GitHub CLI manually:
            echo    1. Go to: https://cli.github.com/
            echo    2. Download and install GitHub CLI for Windows
            echo    3. Restart this script after installation
            echo.
            pause
            exit /b 1
        )
    )
    
    REM Refresh environment
    timeout /t 3 >nul
    call refreshenv >nul 2>&1
    
    REM Verify GitHub CLI installation
    gh --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ? GitHub CLI installation verification failed.
        echo Please restart this script or reboot your computer.
        pause
        exit /b 1
    )
) else (
    echo ? GitHub CLI is already installed
)

gh --version
echo.

echo ?? Checking GitHub authentication...

REM Check if authenticated with GitHub
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo ??  GitHub authentication required
    echo.
    echo ?? Please authenticate with GitHub:
    echo    1. The browser will open for authentication
    echo    2. Choose "GitHub.com"
    echo    3. Choose "HTTPS" (recommended)
    echo    4. Choose "Login with a web browser"
    echo    5. Follow the authentication flow
    echo.
    echo Press any key to start authentication...
    pause >nul
    
    gh auth login
    
    REM Verify authentication
    gh auth status >nul 2>&1
    if %errorlevel% neq 0 (
        echo ? GitHub authentication failed
        echo You can still analyze local repositories without GitHub
        echo.
    ) else (
        echo ? GitHub authentication successful!
    )
) else (
    echo ? Already authenticated with GitHub
    gh auth status
)

echo.
echo ?? Starting comprehensive GitHub and repository analysis...
echo This may take several minutes depending on the number of repositories...
echo.

REM Run the comprehensive analysis
python run_github_analysis.py

if %errorlevel% equ 0 (
    echo.
    echo ? Analysis completed successfully!
    echo.
    echo ?? Generated Reports:
    if exist comprehensive_repository_analysis.md (
        echo    ?? Comprehensive Analysis: comprehensive_repository_analysis.md
        echo       Complete portfolio analysis with monetization recommendations
    )
    if exist github_monetization_report.md (
        echo    ?? GitHub Monetization: github_monetization_report.md  
        echo       GitHub-specific opportunities and value assessment
    )
    if exist analysis_summary.json (
        echo    ?? Summary Data: analysis_summary.json
        echo       Machine-readable data for further processing
    )
    echo.
    echo ?? Your Complete Portfolio Analysis:
    echo    ?? Estimated portfolio value and monetization opportunities
    echo    ?? Repository rankings and improvement recommendations  
    echo    ?? Strategic roadmap for maximizing your GitHub presence
    echo    ?? Local repositories analysis and GitHub upload recommendations
    echo.
    echo ?? Immediate Next Steps:
    echo    1. Review the comprehensive analysis report
    echo    2. Focus on high-value repositories first
    echo    3. Upload valuable local projects to GitHub
    echo    4. Improve documentation for top-ranked projects
    echo    5. Implement monetization strategies for high-potential repos
    echo.
    echo ?? Your GitHub monetization roadmap is ready!
    echo    AutomationCodex has analyzed your complete development portfolio
    echo    and provided specific strategies to maximize its value.
) else (
    echo ? Analysis failed or was interrupted
    echo.
    echo ?? Troubleshooting:
    echo    1. Check error messages above
    echo    2. Ensure Git and GitHub CLI are properly installed
    echo    3. Verify GitHub authentication: gh auth status
    echo    4. Try running individual components:
    echo       - python test_github_integration.py
    echo       - python local_github_integration.py
    echo.
    echo ?? For more help, check TROUBLESHOOTING.md
)

echo.
echo ?? AutomationCodex: Mathematical Rigor Meets Production Reality
echo    Complete GitHub monetization analysis system deployed!
echo.
echo Press any key to exit...
pause >nul