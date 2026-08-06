# IC151 first-lab email

Draft announcement for the Autumn 2026 IC151 laboratory. Send from the course
account to all registered students. Update the bracketed items before sending.

---

**Subject:** IC151 Programming Laboratory — what to do before and during your first lab

Dear students,

The IC151 Programming Laboratory begins on **Thursday, 6 August 2026**. Please read
this fully before you come to your first session — a few minutes now will save you
most of the first lab hour.

Everything in this email, along with the full batch timetable, is kept up to date at
**https://drdebmath.github.io/IITIJul2026CS103/ic151.html**

---

## 1. Where and when

The laboratory is in the **CITC building, first floor**, on computers numbered
1 through 72. Each session runs for the full slot, so please arrive on time.

| Batch | Day | Time | First lab |
| --- | --- | --- | --- |
| A1 | Thursday | 14:30–17:30 | Thu, 6 Aug 2026 |
| A2 | Tuesday | 13:30–16:30 | Tue, 11 Aug 2026 |
| A3 | Wednesday | 13:30–16:30 | Wed, 12 Aug 2026 |
| A4 | Friday | 14:30–17:30 | Fri, 7 Aug 2026 |
| B1 | Monday | 08:30–11:25 | Mon, 10 Aug 2026 |
| B2 | Monday | 13:30–16:25 | Mon, 10 Aug 2026 |
| B3 | Thursday | 08:30–11:25 | Thu, 6 Aug 2026 |
| B4 | Saturday | 13:30–16:25 | Sat, 8 Aug 2026 |

Attend **only your own batch**. If you believe you are in the wrong batch, contact
[the course office / your TA] before the session rather than switching on your own.

**The schedule is tentative.** A scheduled lab is dropped whenever the lectures have
not yet reached the required material, and whenever the institute holiday schedule
takes the slot. The dates published on the course page are planned, not fixed —
follow the announcements for each week. The full date-by-date timetable, including
the final laboratory examination for each batch, is on the course page linked above.

---

## 2. Do these two things before your first lab

**a. Create your GitHub account, if you do not already have one.**
Use a username you are willing to keep for the whole semester.

**b. Submit the registration form with that exact GitHub username.**
[Insert registration form link.] Your repository access is granted from this form,
so a typo here is the single most common reason students cannot open their
assignment later. Check the spelling before you submit.

You will then receive an emailed invitation to your assignment repository. **Accept
it.** It also waits for you at https://github.com/notifications. Until you accept,
your repository link will show a 404.

---

## 3. Setting up the lab computer

1. Take an assigned computer, numbered 1 to 72, in the CITC first-floor lab.
2. Power on the CPU using the long vertical button below the LED.
3. Select **Ubuntu** at startup. Passwords follow the machine name — for example,
   CITC-43 uses `citc123`.
4. Check the network. If needed, connect to `IITI_Secure`. If connectivity still
   fails, move to another available computer rather than losing time on it.
5. Open a **private browsing window** — Firefox: Menu → New Private Window;
   Chrome: Menu → New Incognito Window. These are shared machines, so never sign in
   to a normal window.
6. Sign in with your **official institute Gmail account**, not a personal address.

---

## 4. Finding your assignment

Assignments are distributed through the IC151 assignment portal:

**https://ic151jul2026.github.io/assignment-portal/**

Choose the assignment named in the course announcement, select your lab batch, and
enter your roll number exactly as issued. The portal builds your GitHub link — it
stores no roster data, and GitHub permissions protect the private repository.

Your repository lives in the `IC151Jul2026` organization and is named
`assignment-batch-roll`, for example `helloworld-A2-260000000`.

---

## 5. Submitting your work

You will edit a single file, **`main.cpp`**. There are two ways to submit; pick
either one.

**Option A — edit straight on GitHub.** Open `main.cpp`, click the pencil, replace
`REPLACE_WITH_YOUR_ROLL_NUMBER` with your roll number along with any other change the
assignment asks for, keep the branch as `main`, and press "Commit changes". Your edit
is committed the moment you press the green button, so this submits your work by
itself.

**Option B — check it on your own machine first.** Click "Code" → "Download ZIP",
unzip it, and **keep the folder name exactly as it is** — the checker reads your roll
number from that name. Edit `main.cpp`, then in a terminal:

```sh
cd ~/Downloads/helloworld-A2-260000000-main

g++ -std=c++17 -Wall -Wextra -pedantic main.cpp -o main
./main

chmod +x check.sh
./check.sh
```

A `PASS:` line means your program printed what the assignment expects. On `FAIL:`,
fix `main.cpp` and run `./check.sh` again. The `chmod` line is needed once, because
unzipping removes the executable bit. On Windows, run `check.sh` from WSL or Git Bash.

Then go back to your repository page, choose **Add file → Upload files**, drag in your
edited `main.cpp`, leave "Commit directly to the `main` branch" selected, and press
"Commit changes".

**Please note: editing on your own machine does not submit anything.** Your submission
is whatever is stored in your GitHub repository. After committing, open `main.cpp` on
GitHub and confirm your own code is actually there. The last commit on `main` at the
deadline is what gets graded.

---

## 6. If your repository link shows a 404

GitHub shows the same 404 whether a repository does not exist or you simply cannot
see it, so please work through these in order:

1. **Wrong account.** Check the avatar in GitHub's top-right corner. If it is not the
   account you registered, sign out and sign back in with the right one.
2. **Invitation not accepted.** Open https://github.com/notifications or the
   invitation email, and accept.
3. **Wrong or misspelled username on the form.** Submit the registration form again
   with the correct username. Your latest response replaces the earlier one, and your
   access is fixed in the next update.
4. **Not released yet.** Repositories are created batch by batch. If your batch has
   not been released, the link will 404 until it is.

Still stuck? Contact your lab TA with your roll number and your GitHub username.

---

## 7. Before you leave the lab

- Log out of Gmail and GitHub.
- Confirm the browser saved no passwords.
- Remember your own passwords for the next lab — we cannot recover them for you.
- Ask a TA whenever you are blocked. Once your own work is done, help the classmates
  around you.

Expect a second assignment during the session, following the same workflow.

Bring your questions. See you in the lab.

[Instructor name]
IC151 Programming Laboratory · IIT Indore
