import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Shape;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.util.ArrayList;

import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class gameComponent extends Applet {
	private int height = 500;
	private int width = 500;
	private MainC mainC;
	public final long SLEEP_INTERVAL = 1; //milliseconds
	public double enemyTimer = 0;
	public ArrayList<Enemy> enemies;
	public boolean paused = false;
	public Line line = new Line();
	public boolean lineInitialized = false;
	public Point2D pointOne;
	public Point2D pointTwo;

	
	public void init() {
		this.mainC = new MainC(height);
		this.enemies = new ArrayList<Enemy>();
		this.setSize(width,height);
		//this.setBackground(Color.blue);
		
		// Make the time interval thread
		class TimePassed implements Runnable {

			@Override
			public void run() {
				try {
					while(true){
						Thread.sleep(SLEEP_INTERVAL);
						UnitTimePassed();
					}
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}

		}
		
		new Thread(new TimePassed()).start();
		
		class EnemyCreationTimer implements Runnable{

			@Override
			public void run() {
				while(enemyTimer <= 15){
					enemyTimer += 5;
					try {
						Thread.sleep(3000);
						addNewEnemy();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				
			}
			
		}
		new Thread(new EnemyCreationTimer()).start();
		
		
		class lineListener implements MouseListener, MouseMotionListener{

			@Override
			public void mouseClicked(MouseEvent arg0) {
				// TODO Auto-generated method stub
				
			}
			@Override
			public void mouseDragged(MouseEvent e) {
				if(lineInitialized){
					pointTwo = e.getPoint();
					line.assignPoints(pointOne, pointTwo);
					//System.out.println("x1 = " + pointOne.getX() + " x2 = " + pointTwo.getX());
					//System.out.println("y1 = " + pointOne.getY() + " x2 = " + pointTwo.getY());
				}
			}

			@Override
			public void mouseMoved(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub
				if(!lineInitialized){
					lineInitialized = true;
					pointOne = e.getPoint();
					pointTwo = e.getPoint();
					line.assignPoints(pointOne, pointTwo);
				}
			}
			@Override
			public void mouseReleased(MouseEvent e) {
				if(lineInitialized){
					line.finalize();
					System.out.println(line.slope());
				}
				
			}
			
		}
		lineListener ll = new lineListener();
		this.addMouseListener(ll);
		this.addMouseMotionListener(ll);
		
		
	}

	// In this function, go through and tell everything that a unit of time has
	// passed.
	public void addNewEnemy(){
		double xPoint = (Math.random()*700)+50;
		double yPoint = (Math.random()*700)+50;
		this.enemies.add(new Enemy(xPoint,yPoint,this.height));
	}
	
	public void UnitTimePassed() {
		if(!this.paused){
			this.mainC.timePassed();
			if(this.lineInitialized){
				this.mainC.collideWithLine(this.line);
			}
			for(Enemy e: this.enemies){
				e.timePassed();
			}
			
		
			checkCollisions();
		
		this.repaint();
		}
	}
	
	public void checkCollisions(){
		for(Enemy e: this.enemies){
			if(e.getPoint().distance(this.mainC.getPoint())<this.mainC.getRadius()+e.getRadius()){
				System.out.println("collided");
			}
		}
	}

	public void paint(Graphics g) {
		super.paint(g);
		Graphics2D g2 = (Graphics2D) g;
		//System.out.println("Painted");
		// Paint the main character
		Shape paintMainC = this.mainC.getShape();
		Color paintMainCColor = this.mainC.getColor();
		g2.setColor(paintMainCColor);
		g2.fill(paintMainC);
		
		//Draw the enemies
		for(Enemy e : this.enemies){
			Shape enemyShape = e.getShape();
			Color enemyColor = e.getColor();
			g2.setColor(enemyColor);
			g2.fill(enemyShape);
		}
		
		//Draw the line
		if(lineInitialized){
			Point2D p1 = this.line.getPointOne();
			Point2D p2 = this.line.getPointTwo();
			Color lineColor = this.line.getColor();
			g2.setColor(lineColor);
			g2.drawLine((int) p1.getX(), (int) p1.getY(), (int) p2.getX(), (int) p2.getY());
		}

	}
}
